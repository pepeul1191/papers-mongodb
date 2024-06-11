<script>
  import { onMount } from 'svelte';
  import { save as savePaper, deleteOnePicture } from '../../../services/paper_service';
  import { fetchOne, uploadPicture as upload } from '../../../services/paper_service';

  export let _id = null;

  const _generateId = () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    const oid = timestamp + 'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, _ => (Math.random() * 16 | 0).toString(16))
      .toLowerCase();
    return oid;
  };

  const createReference = (event) => {
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

  let pictures = [];

  let picture = {
    _id: _id == null ? _generateId() : _id,
    file: null,
    url: '',
    name: '',
    created: '',
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
          paper.file_url = `${data.file_url}`;
          pictures = data.images;
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

  const pictureChange = (event) => {
    const { name, value } = event.target;
    if (name === 'file') {
      picture = { ...picture, [name]: event.target.files[0] }; // Captura el primer archivo seleccionado
    } else {
      picture = { ...picture, [name]: value };
    }
  }

  const uploadPicture = (event) => {
    upload(picture)
      .then(response => {
        console.log('Respuesta:', response.data);
        picture._id = response.data._id;
        picture.url = response.data.url;
        picture.created = response.data.created;
        pictures.push(picture);
        console.log(pictures)
        pictures = pictures;
        pictue = {
          _id:  _generateId() ,
          file: null,
          url: '',
          name: '',
          created: '',
        };
      })
      .catch(error => {
        console.error('Error al guardar:', error);
        // Manejar el error
      });
  }

  const deletePicture = (_id) => {
    deleteOnePicture(_id)
      .then(data => {
        pictures = pictures.filter(item => item._id !== _id);
      })
      .catch(error => {
        console.error('Error al eliminar:', error);
        // Manejar el error
      });
  };
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
      <button class="btn btn-info" on:click={createReference}>
        <i class="fa fa-id-card-o" aria-hidden="true"></i>Copiar Referencia
      </button>
      <a href="/{paper.file_url}" target="_blank" class="btn btn-secondary">
        <i class="fa fa-file"></i>Ver Documento
      </a>
      <button type="submit" class="btn btn-primary" on:click={save}>
        <i class="fa fa-check"></i>Guardar Cambios
      </button>
    </div>
  </form>
  <hr>
  <h4 class="mb-4">Imagenes</h4>
  <div class="mb-12">
    <label for="formFile" class="form-label">Subir Imágen</label>
    <div class="d-flex align-items-center">
      <input type="file" class="form-control" id="formFile" name="file" on:change={pictureChange}>
      <input type="text" class="form-control ms-2" placeholder="Nombre de la imagen" id="pictureName" name="name" value={picture.name} on:input={pictureChange}>
      <button type="button" class="btn btn-primary ms-3" on:click={uploadPicture}>
        <i class="fa fa-upload"></i>Subir
      </button>
    </div>
  </div>
  <div class="mb-12">
    {#each pictures as picture}
      <div class="alert alert-secondary picture" role="alert">
        <div class="row align-items-center">
          <div class="col-auto">
            <a href="/{picture.url}" target="_blank" rel="noopener noreferrer">
              <img src="/{picture.url}" alt="{picture.name}" height="50" width="50" />
            </a>
          </div>
          <div class="col">
            {picture.name}<br>
            <sub><b>{picture.created}</b></sub>
          </div>
          <div class="col-auto">
            <button class="btn justify-content-center align-items-center" on:click={deletePicture(picture._id)}>
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .picture{
    border-radius: 0px;
    margin-top: 15px;
  }
</style>