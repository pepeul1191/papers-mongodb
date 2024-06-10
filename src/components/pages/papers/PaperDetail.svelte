<script>
  import { onMount } from 'svelte';
  import { save as savePaper } from '../../../services/paper_service';
  import { fetchOne } from '../../../services/paper_service';

  export let _id = null;

  const _generateId = () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    const oid = timestamp + 'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, _ => (Math.random() * 16 | 0).toString(16))
      .toLowerCase();
    return oid;
  };

  let paper = {
    _id: _id == null ? _generateId() : _id,
    authors: '',
    name: '',
    author_abstract: '',
    my_abstract: '',
    year: null,
    source: '',
    source_url: '',
    my_ranking: 0,
    key_words: [],
    doi: '',
    file: null,
    file_url: '',
  };

  onMount(() => {
    if(_id != null){
      fetchOne(_id)
        .then((data) => {
          console.log('Respuesta:', data);
          paper.name = data.name;
          paper.authors = data.authors;
          paper.author_abstract = data.author_abstract;
          paper.my_abstract = data.my_abstract;
          paper.year = data.year;
          paper.source = data.source;
          paper.source_url = data.source_url;
          paper.my_ranking = data.my_ranking;
          paper.key_words =  data.key_words.map(item => item.name);
          paper.doi = data.doi;
          paper.file = data.file;
          paper.file_url = `/${data.file_url}`;
        })
        .catch(error => {
          console.error('Error al guardar:', error);
          // Manejar el error
        });
    }
   });
  
  const save = (event) => {
    event.preventDefault();
    savePaper(paper)
      .then(response => {
        console.log('Respuesta:', response.data);
        paper.file_url = response.data;
      })
      .catch(error => {
        console.error('Error al guardar:', error);
        // Manejar el error
      });
  }

  const formChange = (event) => {
    const { name, value } = event.target;
    if (name === 'file') {
      paper = { ...paper, [name]: event.target.files[0] }; // Captura el primer archivo seleccionado
    } else if (name == 'key_words'){
      paper = { ...paper, [name]: value.split(';') };
    } else {
      paper = { ...paper, [name]: value };
    }
  }
</script>

<div class="container mt-1">
  <h2 class="mb-4">Formulario de Artículo</h2>
  <h4 class="mb-4">Detalle</h4>
  <form>
    <div class="row mb-3">
      <div class="col-md-1">
        <label for="txtYear" class="form-label">Año</label>
        <input type="text" class="form-control" id="txtYear" name="year" value={paper.year} on:input={formChange}>
      </div>
      <div class="col-md-1">
        <label for="txtMyRanking" class="form-label">Calificacion</label>
        <input type="number" class="form-control" id="txtMyRanking" name="my_ranking" value={paper.my_ranking} on:input={formChange} min="0" max="3">
      </div>
      <div class="col-md-2">
        <label for="txtSoruce" class="form-label">Fuente</label>
        <input type="text" class="form-control" id="txtSoruce" name="source" value={paper.source} on:input={formChange}>
      </div>
      <div class="col-md-5">
        <label for="txtSoruceUrl" class="form-label">Fuente URL</label>
        <input type="text" class="form-control" id="txtSoruceUrl" name="source_url" value={paper.source_url} on:input={formChange}>
      </div>
      <div class="col-md-3">
        <label for="txtDoi" class="form-label">DOI</label>
        <input type="text" class="form-control" id="txtDoi" name="doi" value={paper.doi} on:input={formChange}>
      </div>
    </div>
    <!-- Autores del artículo -->
    <div class="mb-3">
        <label for="txtAuthors" class="form-label">Autores</label>
        <input type="text" class="form-control" id="txtAuthors" name="authors" value={paper.authors} on:input={formChange}>
    </div>
    <!-- Nombre -->
    <div class="mb-3">
        <label for="txtName" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="txtName" name="name" value={paper.name} on:input={formChange}>
    </div>

    <!-- Resumen del autor -->
    <div class="mb-3">
        <label for="txtAuthorAbstract" class="form-label">Resumen del Autor</label>
        <textarea class="form-control" id="txtAuthorAbstract" name="author_abstract" value={paper.author_abstract}  on:input={formChange} rows="8"></textarea>
    </div>
    <!-- Mi Resumen -->
    <div class="mb-3">
        <label for="txtAbstract" class="form-label">Mi Resumen</label>
        <textarea class="form-control" id="txtAbstract" name="my_abstract" value={paper.my_abstract} on:input={formChange} rows="8"></textarea>
    </div>
    <!-- Palabras Clave -->
    <div class="mb-3">
        <label for="txtKeyWords" class="form-label">Palabras Clave</label>
        <input type="text" class="form-control" id="txtKeyWords" name="key_words" value={paper.key_words} on:input={formChange}>
    </div>
    <!-- Subir un Archivo -->
    <div class="mb-3">
      <label for="formFile" class="form-label">Subir un Archivo</label>
      <input type="file" class="form-control" id="formFile" name="file" on:change={formChange}>
    </div>
    <div class="mb-12 text-end">
      <a href="{paper.file_url}" target="_blank" class="btn btn-info">
        <i class="fa fa-picture-o"></i>Ver Documento
      </a>
      <button type="submit" class="btn btn-primary" on:click={save}>
        <i class="fa fa-check"></i>Guardar Cambios
      </button>
    </div>
  </form>
  <hr>
  <h4 class="mb-4">Imagenes</h4>
</div>

<style>

</style>