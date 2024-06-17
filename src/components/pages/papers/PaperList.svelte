<script>
  import { navigate } from 'svelte-routing';  
  import { onMount } from 'svelte';
  import { Modal } from 'bootstrap';
  import { fetchAll, deleteOne, fetchByTopicId } from '../../../services/paper_service';

  export let topic_id = null;
  let papers = [];
  let _idToDelete = null;
  let beforeDeleteModal;
  let pagination = {
    show: false, numberPages: 0, page: 1, step: 10, offset: 0
  };

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
          messageAlert.message = `Se eliminó el artículo <b>${_idDeleted}</b>`;
          messageAlert.class = 'success';
          messageAlert = messageAlert;
          setTimeout(() => {
            messageAlert.show  = false;
          }, 5000); 
          papers = papers.filter(item => item._id !== _idDeleted);
          papers = papers;
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
    if(topic_id == null){
      fetchAll()
        .then(data => {
          //console.log('Respuesta:', data);
          papers = data;
        })
        .catch(error => {
          console.error('Error al guardar:', error);
          // Manejar el error
        });
    }else{
      fetchByTopicId(topic_id)
        .then(data => {
          //console.log('Respuesta:', data);
          papers = data;
          console.log(papers);
          pagination.numberPages = Math.ceil(papers.length / pagination.step);
          if(pagination.numberPages >= 2){
            pagination.show = true;
          }
        })
        .catch(error => {
          console.error('Error al guardar:', error);
          // Manejar el error
        });
    }
  });

  const createReference = (event, paper) => {
    event.preventDefault();
    const reference = `${paper.authors}. ${paper.name}. ${paper.source}, ${paper.year}. DOI: ${paper.doi}`;
    navigator.clipboard.writeText(reference)
    .then(function() {
      console.log('Referencia al portapapeles: ' + reference);
      alert('¡Referencia al portapapeles!');
    })
    .catch(function(err) {
      console.error('Error al intentar copiar al portapapeles: ', err);
      alert('¡Error al intentar copiar al portapapeles!');
    });
  }
</script>

<svelte:head>
	<title>Lista de Papers de Tópico</title>
</svelte:head>

<div class="container mt-4">
  {#if topic_id == null}
    <h5 class="mb-4">Lista de Todos los Artículos</h5>
  {:else}
  <h5 class="mb-4">Lista de los Artículos del Tópico</h5>
  {/if}
  {#if messageAlert.show}
  <div class="alert alert-{messageAlert.class}" role="alert">
    {@html messageAlert.message}
  </div>
  {/if}
  <hr>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Autor(s)</th>
        <th>Cadena</th>
        <th>Etiquetas</th>
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
          <td>{paper.search_string !== undefined ? paper.search_string.name : ''}</td>
          <td>
            {#if paper.tags != []}
              {#each paper.tags as tag}
                {tag.name}<br>
              {/each}
            {/if}
          </td>
          <td>{paper.year}</td>
          <td>{paper.my_ranking}</td>
          <td style="text-align: center;">
            <a class="btn-button" href="/topic/{topic_id}/paper/edit/{paper._id}" aria-current="page" on:click|preventDefault={() => {navigate(`/topic/${topic_id}/paper/edit/${paper._id}`)}}>
              <i class="fa fa-pencil"></i>
            </a>
            <a class="btn-button" href="/topic/{topic_id}/paper" aria-current="page" on:click|preventDefault={(event) => createReference(event, paper)}>
              <i class="fa fa-id-card-o"></i>
            </a>
            <a class="btn-button" href="/{paper.file_url}" target="_blank">
              <i class="fa fa-search"></i>
            </a>
            <a class="btn-button" href="/paper/delete/{paper._id}" aria-current="page" on:click|preventDefault={deleteDocument(paper._id)}>
              <i class="fa fa-trash"></i>
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="7">
          {pagination.numberPages}
        </td>
      </tr>
    </tfoot>
  </table>
  <div class="mb-12 text-end">
    {#if topic_id == null}
      <a class="btn btn-primary" href="/paper/add" aria-current="page" on:click|preventDefault={() => {navigate('/paper/add')}}>
        <i class="fa fa-plus"></i>Agregar Paper
      </a>
    {:else}
      <a class="btn btn-primary" href={`/topic/${topic_id}/paper/add`} aria-current="page" on:click|preventDefault={() => {navigate(`/topic/${topic_id}/paper/add`)}}>
        <i class="fa fa-plus"></i>Agregar Paper
      </a>
    {/if}
  </div>
</div>

<div class="modal fade" bind:this={beforeDeleteModal}>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Seguro que quiere eliminar este artículo?</h5>
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