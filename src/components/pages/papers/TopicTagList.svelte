<script>
  import { onMount } from 'svelte';
  import { Modal } from 'bootstrap';
  import { save, deleteOne, fetchAll } from '../../../services/tag_service';
  import { fetchAllTags } from '../../../services/topic_service';

  export let topic_id = null;
  let newTag = {
    _id: null,
    name: '',
    created: null,
    edited: null,
    topic_id: topic_id,
  };
  let topics = [];
  let _idToDelete = null;
  let beforeDeleteModal;

  const formChange = (event) => {
    const { name, value } = event.target;
    newTag = { ...newTag, [name]: value };
  }

  const addTag = (event) => {
    event.preventDefault();
    save(newTag)
      .then(response => {
        console.log('Respuesta:', response.data);
        topics.push(response.data);
        topics = topics;
        messageAlert.show = true;
        messageAlert.message = `Se agregó el tópico <b>${response.data._id}</b>`;
        messageAlert.class = 'success';
        messageAlert = messageAlert;
        setTimeout(() => {
          messageAlert.show  = false;
        }, 5000); 
      })
      .catch(error => {
        console.error('Error al guardar:', error);
        // Manejar el error
      });
  }

  const deleteDocument = (_id) => {
    _idToDelete = _id;
    beforeDeleteModal.show();
  }

  const closeModal = () => {
    _idToDelete = null;
    beforeDeleteModal.hide();
  }

  let messageAlert = {
    show: false,
    message: '',
    class: '',
  };

  const deleteOk = () => {
    // Aquí puedes realizar acciones al aceptar el modal
    if(_idToDelete != null){
      deleteOne(_idToDelete)
        .then(_idDeleted => {
          messageAlert.show = true;
          messageAlert.message = `Se eliminó el tópico <b>${_idDeleted}</b>`;
          messageAlert.class = 'success';
          messageAlert = messageAlert;
          setTimeout(() => {
            messageAlert.show  = false;
          }, 5000); 
          topics = topics.filter(item => item._id !== _idDeleted);
          topics = topics;
        })
        .catch(error => {
          console.error('Error al eliminar:', error);
          // Manejar el error
        });
    }
    closeModal();
  }

  onMount(() => {
    beforeDeleteModal = new Modal(beforeDeleteModal);
    fetchAllTags(topic_id)
      .then(data => {
        //console.log('Respuesta:', data);
        topics = data;
      })
      .catch(error => {
        messageAlert.show = true;
        messageAlert.message = 'Ocurriún un error al traer los tópicos del servidor';
        messageAlert.class = 'danger';
        messageAlert = messageAlert;
        setTimeout(() => {
          messageAlert.show  = false;
        }, 5000); 
      });
  })
</script>

<div class="container mt-4">
  <h5 class="mb-4">Gestión de Etiquetas del Tópico</h5>
  {#if messageAlert.show}
  <div class="alert alert-{messageAlert.class}" role="alert">
    {@html messageAlert.message}
  </div>
  {/if}
  <div class="mb-12">
    <label for="formFile" class="form-label">Nombre de la nueva etiqueta</label>
    <div class="row">
      <div class="col-md-5">
        <input type="text" class="form-control" placeholder="Nombre " id="pictureName" name="name" value={newTag.name} on:input={formChange}>
      </div>
      <div class="col-md-4">
        <button type="button" class="btn btn-primary ms-3" on:click={addTag}>
          <i class="fa fa-plus"></i>Agregar
        </button>
      </div>
    </div>
  </div>
  <hr>
  <div class="mb-12">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th style="text-align: center;">Artículos</th>
          <th>Operaciones</th>
        </tr>
      </thead>
      <tbody>
    {#each topics as topic}
    <tr>
      <td>{topic.name}</td>
      <td>0</td>
      <td style="padding-left: 47px;">
        <a class="btn-button" href="/topic/delete/{topic._id}" aria-current="page" on:click|preventDefault={deleteDocument(topic._id)}>
          <i class="fa fa-trash"></i>
        </a>
      </td>
    </tr>
    {/each}
  </div>
</div>

<div class="modal fade" bind:this={beforeDeleteModal}>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Seguro que quiere eliminar este tópico?</h5>
        <button type="button" class="btn-close" aria-label="Close" on:click={closeModal}></button>
      </div>
      <div class="modal-body">
        <p>Si acepta no podrá deshacer la eliminación.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" on:click={deleteOk}>
          <i class="fa fa-check"></i>Aceptar
        </button>
        <button type="button" class="btn btn-secondary" on:click={closeModal}>
          <i class="fa fa-times"></i>Cancelar
        </button>
      </div>
    </div>
  </div>
</div>

<style>

</style>