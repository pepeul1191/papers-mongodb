<script>
  import { navigate } from 'svelte-routing';  
  import { onMount } from 'svelte';
  import { Modal } from 'bootstrap';
  import { save, deleteOne, fetchAll, fetchBackup } from '../../../services/topic_service';

  let newTopic = {
    _id: null,
    name: '',
    created: null,
    edited: null,
  };

  let topics = [];
  let _idToDelete = null;
  let beforeDeleteModal;

  const formChange = (event) => {
    const { name, value } = event.target;
    newTopic = { ...newTopic, [name]: value };
  }

  const addTopic = (event) => {
    event.preventDefault();
    save(newTopic)
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
          messageAlert.show = true;
          messageAlert.message = `Ocurrió un error al eleminar el tópico`;
          messageAlert.class = 'danger';
          messageAlert = messageAlert;
          setTimeout(() => {
            messageAlert.show  = false;
          }, 5000); 
          console.error('Error al eliminar:', error);
          // Manejar el error
        });
    }
    closeModal();
  }

  const downloadBackup = () => {
    fetchBackup()
      .then(data => {
          console.log(data);
          const link = document.createElement('a');
          link.href = '/' + data;
          link.setAttribute('download', '');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(error => {
          messageAlert.show = true;
          messageAlert.message = `Ocurrió un error al descargar el backup`;
          messageAlert.class = 'danger';
          messageAlert = messageAlert;
          setTimeout(() => {
            messageAlert.show  = false;
          }, 5000); 
          console.error('Error al descargar backup: ', error);
          // Manejar el error
        });
  }

  onMount(() => {
    beforeDeleteModal = new Modal(beforeDeleteModal);
    fetchAll()
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
  <h5 class="mb-4">Gestión de Tópicos</h5>
  {#if messageAlert.show}
  <div class="alert alert-{messageAlert.class}" role="alert">
    {@html messageAlert.message}
  </div>
  {/if}
  <div class="mb-12">
    <label for="formFile" class="form-label">Nombre del nuevo tópico</label>
    <div class="row">
      <div class="col-md-5">
        <input type="text" class="form-control" placeholder="Nombre " id="pictureName" name="name" value={newTopic.name} on:input={formChange}>
      </div>
      <div class="col-md-4">
        <button type="button" class="btn btn-primary ms-3" on:click={addTopic}>
          <i class="fa fa-plus"></i>Agregar
        </button>
        <button type="button" class="btn btn-success ms-3" on:click={downloadBackup}>
          <i class="fa fa-download"></i>Descargar Backup
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
          <th>Creado</th>
          <th>Editado</th>
          <th style="text-align: center;">Artículos</th>
          <th style="text-align: center;">Etiquetas</th>
          <th>Operaciones</th>
        </tr>
      </thead>
      <tbody>
    {#each topics as topic}
    <tr>
      <td>{topic.name}</td>
      <td>{topic.created}</td>
      <td>{topic.updated}</td>
      <td style="text-align: center;">{topic.papers}</td>
      <td style="text-align: center;">{topic.tags}</td>
      <td style="padding-left: 18px;">
        <a class="btn-button" href="/topic/${topic._id}/search-string" aria-current="page" on:click|preventDefault={() => {navigate(`/topic/${topic._id}/search-string`)}}>
          <i class="fa fa-hashtag"></i>
        </a>
        <a class="btn-button" href="/topic/${topic._id}/tag" aria-current="page" on:click|preventDefault={() => {navigate(`/topic/${topic._id}/tag`)}}>
          <i class="fa fa-tags"></i>
        </a>
        <a class="btn-button" href="/topic/${topic._id}/paper" aria-current="page" on:click|preventDefault={() => {navigate(`/topic/${topic._id}/paper`)}}>
        <i class="fa fa-list"></i>
        </a>
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