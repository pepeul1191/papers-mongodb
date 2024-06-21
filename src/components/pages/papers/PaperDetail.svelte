<script>
  import { onMount } from 'svelte';
  import { uploadOne, deleteOne } from '../../../services/image_service';
  import { save as savePaper, fetchOne } from '../../../services/paper_service';
  import { fetchAllTags } from '../../../services/topic_service';
  import { fetchByTopicId } from '../../../services/search_string_service';
  import e from 'cors';
  
  export let _id = null;
  export let topic_id = null;

  const _generateId = () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    const oid = timestamp + 'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, _ => (Math.random() * 16 | 0).toString(16))
      .toLowerCase();
    return oid;
  };

  const createReference = (event) => {
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

  let pictures = [];
  let tags = [];
  let searchStrings = [];

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
    search_string_id: '',
  };

  let messageDetailAlert = {
    show: false,
    message: '',
    class: '',
  };

  let messageImageAlert = {
    show: false,
    message: '',
    class: '',
  };

  onMount(() => {
    if(_id != null){
      console.log(topic_id);
      fetchAllTags(topic_id)
        .then((data) => {
          console.log('Respuesta:', data);
          tags = data;
          fetchByTopicId(topic_id)
            .then(data => {
              //console.log('Respuesta:', data);
              searchStrings = data;
              console.log(searchStrings)
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
                  paper.search_string_id = data.search_string_id;
                  paper.my_ranking = data.my_ranking;
                  paper.key_words =  data.key_words.map(item => item.name);
                  paper.doi = data.doi;
                  paper.file = data.file;
                  paper.file_url = `${data.file_url}`;
                  // picture
                  pictures = data.images;
                  // tags
                  tags.forEach((tag) => {
                    if (data.tags.includes(tag._id)) {
                      tag.checked = true;
                    } else {
                      tag.checked = false;
                    }
                  });
                  tags = tags;
                })
                .catch(error => {
                  console.error('Error al guardar:', error);
                  // Manejar el error
                });
            })
            .catch(error => {
              console.error('Error al guardar:', error);
              // Manejar el error
            });
        })
        .catch(error => {
          console.error('Error al guardar:', error);
          // Manejar el error
        });
    }else{
      fetchAllTags(topic_id)
        .then((data) => {
          console.log('Respuesta:', data);
          tags = data;
          fetchByTopicId(topic_id)
            .then(data => {
              //console.log('Respuesta:', data);
              searchStrings = data;
              console.log(searchStrings)  
            })
            .catch(error => {
              console.error('Error al guardar:', error);
              // Manejar el error
            });
        })
        .catch(error => {
          console.error('Error al guardar:', error);
          // Manejar el error
        });
    }
   });
  
  const save = (event) => {
    event.preventDefault();
    savePaper(paper, tags, topic_id)
      .then(response => {
        //console.log('Respuesta:', response.data);
        paper.file_url = response.data;
        messageDetailAlert.show = true;
          messageDetailAlert.message = `Se guardó los cambios en el artículo`;
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
    console.log(event.value)
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
    uploadOne(picture)
      .then(response => {
        console.log('Respuesta:', response.data);
        picture._id = response.data._id;
        picture.url = response.data.url;
        picture.created = response.data.created;
        pictures.push(picture);
        console.log(pictures)
        pictures = pictures;
        picture = {
          _id:  _generateId() ,
          file: null,
          url: '',
          name: '',
          created: '',
        };
        messageImageAlert.show = true;
        messageImageAlert.message = `Se guardó la imagen del artículo`;
        messageImageAlert.class = 'success';
        messageImageAlert = messageImageAlert;
        setTimeout(() => {
          messageImageAlert.show  = false;
        }, 5000); 
      })
      .catch(error => {
        console.error('Error al guardar:', error);
        // Manejar el error
      });
  }

  const deletePicture = (_id) => {
    deleteOne(_id)
      .then(data => {
        pictures = pictures.filter(item => item._id !== _id);
        messageImageAlert.show = true;
        messageImageAlert.message = `Se eliminó la imagen del artículo`;
        messageImageAlert.class = 'success';
        messageImageAlert = messageImageAlert;
        setTimeout(() => {
          messageImageAlert.show  = false;
        }, 5000); 
      })
      .catch(error => {
        console.error('Error al eliminar:', error);
        // Manejar el error
      });
  };

  const handleCheckboxChange = (event, tag) => {
    tag.checked = event.target.checked;
  }
</script>

<svelte:head>
	<title>Detalle de un Paper</title>
</svelte:head>

<div class="container mt-4">
  <h4 class="mb-4">Formulario de Artículo</h4>
  <hr>
  {#if messageDetailAlert.show}
  <div class="alert alert-{messageDetailAlert.class}" role="alert">
    {@html messageDetailAlert.message}
  </div>
  {/if}
  <h5 class="mb-4">Detalle</h5>
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
    <!-- Cadena -->
    <div class="mb-3">
      <label for="txtName" class="form-label">Cadena de Búsqueda</label>
      <select class="form-select" id="txtName" name="search_string_id" on:change={formChange} bind:value={paper.search_string_id} on:change={formChange}>
        {#each searchStrings as searchString}
          {#if searchString._id == paper.search_string_id}
            <option value="{searchString._id}" selected>{searchString.name}</option>
          {:else}
            <option value="{searchString._id}">{searchString.name}</option>
          {/if}
        {/each}
      </select>
    </div>
    <div class="mb-3">
      <label for="txtName" class="form-label">Nombre</label>
      <input type="text" class="form-control" id="txtName" name="name" value={paper.name} on:input={formChange}>
    </div>
    <!-- Autores del artículo -->
    <div class="mb-3">
        <label for="txtAuthors" class="form-label">Autores</label>
        <input type="text" class="form-control" id="txtAuthors" name="authors" value={paper.authors} on:input={formChange}>
    </div>
    <!-- Resumen del autor -->
    <div class="mb-3">
        <label for="txtAuthorAbstract" class="form-label">Resumen del Autor</label>
        <textarea class="form-control" id="txtAuthorAbstract" name="author_abstract" value={paper.author_abstract}  on:input={formChange} rows="8"></textarea>
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
    <!-- Mi Resumen -->
    <div class="mb-3">
        <label for="txtAbstract" class="form-label">Mi Resumen</label>
        <textarea class="form-control" id="txtAbstract" name="my_abstract" value={paper.my_abstract} on:input={formChange} rows="8"></textarea>
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label">Mis Etiquetas</label>
      <div class="row">
        {#each tags as tag}
        <div class="col-2">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id={'checkbox' + tag._id} value="option1" on:change={(event) => handleCheckboxChange(event, tag)} bind:checked={tag.checked} name={'checkbox' + tag._id}>
                <label class="form-check-label" for={'checkbox' + tag._id}>
                  {tag.name}
                </label>
            </div>
        </div>
        {/each}
      </div>
    </div>
    <div class="mb-12 text-end">
      <button class="btn btn-info btn-form" on:click={createReference}>
        <i class="fa fa-id-card-o" aria-hidden="true"></i>Copiar Referencia
      </button>
      <a href="/{paper.file_url}" target="_blank" class="btn btn-secondary btn-form">
        <i class="fa fa-search"></i>Ver Documento
      </a>
      <button type="submit" class="btn btn-primary btn-form" on:click={save}>
        <i class="fa fa-check"></i>Guardar Cambios
      </button>
    </div>
  </form>
  <hr>
  {#if messageImageAlert.show}
  <div class="alert alert-{messageImageAlert.class}" role="alert">
    {@html messageImageAlert.message}
  </div>
  {/if}
  <h5 class="mb-4">Imagenes</h5>
  <div class="mb-12">
    <label for="formFile" class="form-label">Subir Imágen</label>
    <div class="row">
      <div class="col-md-5">
        <input type="file" class="form-control" id="formFile" name="file" on:change={pictureChange}>
      </div>
      <div class="col-md-5">
        <input type="text" class="form-control ms-2" placeholder="Nombre de la imagen" id="pictureName" name="name" value={picture.name} on:input={pictureChange}>
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-primary ms-3" on:click={uploadPicture}>
          <i class="fa fa-upload"></i>Subir Imagen
        </button>
      </div>
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

  .btn-form{
    margin-left: 10px;
  }
</style>