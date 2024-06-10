<script>
  import { navigate } from 'svelte-routing';  
  import { onMount } from 'svelte';
  import { fetchAll } from '../../../services/paper_service';

  let papers = [];

  onMount(() => { 
    fetchAll()
      .then(data => {
        //console.log('Respuesta:', data);
        papers = data;
      })
      .catch(error => {
        console.error('Error al guardar:', error);
        // Manejar el error
      });
  });

  const deleteDocument = (_id) => {
    alert(_id);
  }
</script>

<div class="container mt-1">
  <h2 class="mb-4">Lista de Papers</h2>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Autor(s)</th>
        <th>Fuente</th>
        <th>Año</th>
        <th>Ranking</th>
        <th>Operaciones</th>
      </tr>
    </thead>
    <tbody>
      <!-- Iteración sobre los datos para crear filas -->
      {#each papers as paper}
        <tr>
          <td>{paper.name}</td>
          <td>{paper.authors}</td>
          <td>{paper.source}</td>
          <td>{paper.year}</td>
          <td>{paper.my_ranking}</td>
          <td style="text-align: center;">
            <a class="btn-button" href="/paper/edit/{paper._id}" aria-current="page" on:click|preventDefault={() => {navigate(`/paper/edit/${paper._id}`)}}>
              <i class="fa fa-pencil"></i>
            </a>
            <a class="btn-button" href="{paper.file_url}" target="_blank">
              <i class="fa fa-picture-o"></i>
            </a>
            <a class="btn-button" href="/paper/edit/{paper._id}" aria-current="page" on:click|preventDefault={deleteDocument(paper._id)}>
              <i class="fa fa-times"></i>
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="mb-12 text-end">
    <a class="btn btn-primary" href="/paper/add" aria-current="page" on:click|preventDefault={() => {navigate('/paper/add')}}>
      <i class="fa fa-plus"></i>Agregar Paper
    </a>
  </div>
</div>

<style>
</style>