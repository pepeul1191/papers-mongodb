<script>
  import { navigate } from 'svelte-routing';  
  import { onMount } from 'svelte';
  import { Modal } from 'bootstrap';
  import { fetchAll, deleteOne, fetchByTopicId } from '../../../services/paper_service';

  export let topic_id = null;
  let papersDownloaded = [];
  let papers = [];
  let _idToDelete = null;
  let beforeDeleteModal;
  let pagination = {
    show: false, numberPages: 0, page: 1, step: 10, offset: 0
  };
  let rowsPerPage = [5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 250, 500, 1000];
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
          papersDownloaded = data;
          pagination.numberPages = Math.ceil(papersDownloaded.length / pagination.step);
          if(pagination.numberPages >= 2){
            pagination.show = true;
            papers = papersDownloaded.slice(0, 10);
          }else{
            papers = papersDownloaded;
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
    const reference = `${paper.authors}. ${paper.name}. ${paper.source}, ${paper.year}. ${paper.doi ? 'DOI: ' + paper.doi : 'URL: ' + paper.source_url}`;
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

  const handleStepChange = (event) => {
    console.log(pagination.step)
    pagination.step = parseInt(event.target.value);
    pagination.numberPages = Math.ceil(papersDownloaded.length / pagination.step);
    pagination.page = 1;
    papers = papersDownloaded.slice(0, pagination.step);
  }

  const goBegin = () => {
    pagination.page = 1;
    papers = papersDownloaded.slice(0, pagination.step);
  }

  const goPrevious = () => {
    if (pagination.page > 1) {
      pagination.page -= 1;
      papers = papersDownloaded.slice(
        (pagination.page - 1) * pagination.step, 
        (pagination.page * pagination.step)
      );
    }
  }

  const goNext = () => {
    if (pagination.page < pagination.numberPages) {
      pagination.page += 1;
      papers = papersDownloaded.slice(
        (pagination.page - 1) * pagination.step, 
        (pagination.page * pagination.step)
      );
    }
  }

  const goLast = () => {
    pagination.page = pagination.numberPages;
    papers = papersDownloaded.slice(
      (pagination.page - 1) * pagination.step, 
      (pagination.page * pagination.step)
    );
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
    {#if pagination.show}
      <tfoot>
        <tr>
          <td colSpan="7">
            <div style="text-align: right;">
              <div class="align-items-center" style="display: inline-block; margin-right: 10px;">
                <label style="position: relative; float: left; margin-right: 10px;">Filas por página:</label>
                <select on:change={handleStepChange} bind:value={pagination.step} class="selectPaginationTable">
                  {#each rowsPerPage as number}
                    {#if pagination.step == number}
                      <option value="{number}" selected>{number}</option>
                    {:else}
                      <option value="{number}">{number}</option>
                    {/if}
                  {/each}
                </select>
              </div>
              {#if pagination.page !== 1}
                <i class="fa fa-angle-double-left footer-icon pagination-btn" on:click={goBegin} aria-hidden="true"></i> &nbsp;
                <i class="fa fa-angle-left footer-icon pagination-btn" on:click={goPrevious} aria-hidden="true"></i> &nbsp;
              {/if}
              <label class="pagination-number">{pagination.page} / {pagination.numberPages}</label>
              {#if pagination.page !== pagination.numberPages}
                &nbsp; <i class="fa fa-angle-right footer-icon pagination-btn" on:click={goNext} aria-hidden="true"></i>
                &nbsp; <i class="fa fa-angle-double-right footer-icon pagination-btn" on:click={goLast} aria-hidden="true"></i>
              {/if}
            </div>
          </td>
        </tr>
      </tfoot>
    {/if}
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

.selectPaginationTable{
  width: 50px;
  border: 0px;
  background: transparent;
  text-align: center;
}

.inputText{
  border: 0px;
  background: transparent;
}

.pagination-btn{
  font-size: 20px;
  font-weight: 600;
}

.pagination-btn:hover{
  cursor: pointer;
}

.saveButton{
  margin-left: 10px;
}

.link{
  position: relative;
  float: left;
  color: var(--bs-table-color-state,var(--bs-table-color-type,var(--bs-table-color)));
}
</style>