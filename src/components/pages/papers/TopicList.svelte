<script>
  import { navigate } from 'svelte-routing';  
  import { onMount } from 'svelte';
  import { save, deleteOne, fetchAll, fetchBackup } from '../../../services/topic_service';

  let newTopic = {
    _id: null,
    name: '',
    created: null,
    edited: null,
  };

  let topics = [];

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
      })
      .catch(error => {
        console.error('Error al guardar:', error);
        // Manejar el error
      });
  }

  const deleteDocument = (_id) => {
    deleteOne(_id)
      .then(data => {
        topics = topics.filter(item => item._id !== _id);
      })
      .catch(error => {
        console.error('Error al eliminar:', error);
        // Manejar el error
      });
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
          console.error('Error al descargar backup: ', error);
          // Manejar el error
        });
  }

  onMount(() => {
    fetchAll()
      .then(data => {
        //console.log('Respuesta:', data);
        topics = data;
      })
      .catch(error => {
        console.error('Error al guardar:', error);
        // Manejar el error
      });
  })
</script>

<div class="container mt-4">
  <h5 class="mb-4">Gestión de Tópicos</h5>
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
      <td style="padding-left: 40px;">
        <a class="btn-button" href="/topic/${topic._id}/paper" aria-current="page" on:click|preventDefault={() => {navigate(`/topic/${topic._id}/paper`)}}>
          <i class="fa fa-file"></i>
        </a>
        <a class="btn-button" href="/topic/delete/{topic._id}" aria-current="page" on:click|preventDefault={deleteDocument(topic._id)}>
          <i class="fa fa-times"></i>
        </a>
      </td>
    </tr>
    {/each}
  </div>
</div>

<style>
</style>