<script>
  import { navigate } from 'svelte-routing';  
  import { onMount } from 'svelte';
  import { Modal } from 'bootstrap';
  import { fetchAll, deleteOne, fetchByTopicId } from '../../../services/search_string_service';

  export let topic_id = null;
  let search_strings = [];
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
          search_strings = search_strings.filter(item => item._id !== _idDeleted);
          search_strings = search_strings;
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
          search_strings = data;
        })
        .catch(error => {
          console.error('Error al guardar:', error);
          // Manejar el error
        });
    }else{
      fetchByTopicId(topic_id)
        .then(data => {
          //console.log('Respuesta:', data);
          search_strings = data;
          console.log(search_strings);
          pagination.numberPages = Math.ceil(search_strings.length / pagination.step);
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

  /*const deleteDocument = (_id) => {
    
  }*/
</script>

<svelte:head>
	<title>Lista de Cadenas de Búsqueda de Tópico</title>
</svelte:head>

<div class="container mt-4">
  {#if topic_id == null}
    <h5 class="mb-4">Lista de Todos los Cadenas de Búsqueda</h5>
  {:else}
    <h5 class="mb-4">Lista de los Cadenas de Búsqueda del Tópico</h5>
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
        <th>Fuente</th>
        <th>Operaciones</th>
      </tr>
    </thead>
    <tbody>
      <!-- Iteración sobre los datos para crear filas -->
      {#each search_strings as search_string}
        <tr>
          <td>{search_string.name}</td>
          <td>{search_string.source}</td>
          <td style="text-align: center;">
            <a class="btn-button" href="/topic/{topic_id}/search-string/edit/{search_string._id}" aria-current="page" on:click|preventDefault={() => {navigate(`/topic/${topic_id}/search-string/edit/${search_string._id}`)}}>
              <i class="fa fa-pencil"></i>
            </a>
            <a class="btn-button" href="/{search_string.file_url}" target="_blank">
              <i class="fa fa-search"></i>
            </a>
            <a class="btn-button" href="/search-string/delete/{search_string._id}" aria-current="page" on:click|preventDefault={deleteDocument(search_string._id)}>
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
      <a class="btn btn-primary" href="/search-string/add" aria-current="page" on:click|preventDefault={() => {navigate('/search-string/add')}}>
        <i class="fa fa-plus"></i>Agregar search_string
      </a>
    {:else}
      <a class="btn btn-primary" href={`/topic/${topic_id}/search-string/add`} aria-current="page" on:click|preventDefault={() => {navigate(`/topic/${topic_id}/search-string/add`)}}>
        <i class="fa fa-plus"></i>Agregar Cadena
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