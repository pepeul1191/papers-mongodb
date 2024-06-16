<script>
  import { onMount } from 'svelte';
  import { save as saveDetail, fetchOne } from '../../../services/search_string_service';
  
  export let _id = null;
  export let topic_id = null;

  const _generateId = () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    const oid = timestamp + 'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, _ => (Math.random() * 16 | 0).toString(16))
      .toLowerCase();
    return oid;
  };

  let searchString = {
    _id: _id == null ? _generateId() : _id,
    url: '',
    name: '',
    description: '',
    source: '',
    url: '',
    file: null,
    file_url: '',
  };

  let messageDetailAlert = {
    show: false,
    message: '',
    class: '',
  };

  onMount(() => {
    if(_id != null){
      console.log(topic_id);
      fetchOne(_id)
        .then((data) => {
          console.log('Respuesta:', data);
          searchString.name = data.name;
          searchString.description = data.description;
          searchString.source = data.source;
          searchString.url = data.url;
          searchString.file = data.file;
          searchString.file_url = `${data.file_url}`;
        })
        .catch(error => {
          console.error('Error al guardar:', error);
          // Manejar el error
        });
    }
   });
  
  const save = (event) => {
    event.preventDefault();
    saveDetail(searchString, topic_id)
      .then(response => {
        //console.log('Respuesta:', response.data);
        searchString.file_url = response.data;
        messageDetailAlert.show = true;
          messageDetailAlert.message = `Se guardó los cambios en la cadena de búsqueda`;
          messageDetailAlert.class = 'success';
          messageDetailAlert = messageDetailAlert;
          setTimeout(() => {
            messageDetailAlert.show  = false;
          }, 5000); 
      })
      .catch(error => {
        console.error('Error al guardar:', error);
        // Manejar el error
      });
  }

  const formChange = (event) => {
    const { name, value } = event.target;
    if (name === 'file') {
      searchString = { ...searchString, [name]: event.target.files[0] }; // Captura el primer archivo seleccionado
    } else {
      searchString = { ...searchString, [name]: value };
    }
  }
</script>

<div class="container mt-4">
  <h4 class="mb-4">Formulario de la Cadena de Búsqueda</h4>
  <hr>
  {#if messageDetailAlert.show}
  <div class="alert alert-{messageDetailAlert.class}" role="alert">
    {@html messageDetailAlert.message}
  </div>
  {/if}
  <form>
    <div class="row mb-3">
    <!-- Autores del artículo -->
    <div class="mb-3">
        <label for="txtName" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="txtName" name="name" value={searchString.name} on:input={formChange}>
    </div>
    <div class="row mb-3">
      <div class="col-md-3">
        <label for="txtSource" class="form-label">Fuente</label>
        <input type="text" class="form-control" id="txtSource" name="source" value={searchString.source} on:input={formChange}>
      </div>
      <div class="col-md-9">
        <label for="txtURL" class="form-label">URL</label>
        <input type="text" class="form-control" id="txtURL" name="url" value={searchString.url} on:input={formChange} min="0" max="3">
      </div>
    </div>
    <!-- Resumen del autor -->
    <div class="mb-3">
      <label for="txtDescription" class="form-label">Descripción Adicional</label>
      <textarea class="form-control" id="txtDescription" name="description" value={searchString.description}  on:input={formChange} rows="4"></textarea>
    </div>
    <!-- Subir un Archivo -->
    <div class="mb-3">
      <label for="formFile" class="form-label">Subir un Archivo</label>
      <input type="file" class="form-control" id="formFile" name="file" on:change={formChange}>
    </div>
    <div class="mb-12 text-end">
      <a href="/{searchString.file_url}" target="_blank" class="btn btn-secondary btn-form">
        <i class="fa fa-download"></i>Descargar Documento
      </a>
      <button type="submit" class="btn btn-primary btn-form" on:click={save}>
        <i class="fa fa-check"></i>Guardar Cambios
      </button>
    </div>
  </form>
</div>

<style>
  .picture{
    border-radius: 0px;
    margin-top: 15px;
  }

  .btn-form{
    margin-left: 10px;
  }
</style>