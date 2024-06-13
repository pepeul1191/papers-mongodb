<script>
  import { navigate } from 'svelte-routing';  
  import { onMount } from 'svelte';
  import { save, deleteOne } from '../../../services/topic_service';

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
    alert();
  }
</script>

<div class="container mt-4">
  <h5 class="mb-4">Gestión de Tópicos</h5>
  <div class="mb-12">
    <label for="formFile" class="form-label">Nombre del nuevo tópico</label>
    <div class="row">
      <div class="col-md-5">
        <input type="text" class="form-control" placeholder="Nombre " id="pictureName" name="name" value={newTopic.name} on:input={formChange}>
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-primary ms-3" on:click={addTopic}>
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
          <th>Creado</th>
          <th>Editado</th>
          <th>Artículos</th>
          <th>Operaciones</th>
        </tr>
      </thead>
      <tbody>
    {#each topics as topic}
    <tr>
      <td>{topic.name}</td>
      <td>{topic.created}</td>
      <td>{topic.updated}</td>
      <td>{topic.articles}</td>
      <td style="padding-left: 40px;">
        <a class="btn-button" href="/topic/${topic._id}/article" aria-current="page" on:click|preventDefault={() => {navigate(`/topic/${topic._id}/article`)}}>
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