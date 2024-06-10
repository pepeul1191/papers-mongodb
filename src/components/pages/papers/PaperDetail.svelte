<script>
  import { navigate } from 'svelte-routing';  
  import { save as savePaper } from '../../services/paper_service';

  const _generateId = () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    const oid = timestamp + 'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, _ => (Math.random() * 16 | 0).toString(16))
      .toLowerCase();
    return oid;
  };

  let paper = {
    _id: _generateId(),
    authors: 'Zhang R.; Xiong K.; Du H.; Niyato D.; Kang J.; Shen X.; Vincent Poor H.',
    name: 'Generative AI-enabled Vehicular Networks: Fundamentals, Framework, and Case Study',
    author_abstract: 'Recognizing the tremendous improvements that the integration of generative AI can bring to intelligent transportation systems, this article explores the integration of generative AI technologies in vehicular networks, focusing on their potential applications and challenges. Generative AI, with its capabilities of generating realistic data and facilitating advanced decision-making processes, enhances various applications when combined with vehicular networks, such as navigation optimization, traffic prediction, data generation, and evaluation. Despite these promising applications, the integration of generative AI with vehicular networks faces several challenges, such as real-time data processing and decision-making, adapting to dynamic and unpredictable environments, as well as privacy and security concerns. To address these challenges, we propose a multi-modality semanticaware framework to enhance the service quality of generative AI. By leveraging multi-modal and semantic communication technologies, the framework enables the use of text and image data for creating multi-modal content, providing more reliable guidance to receiving vehicles and ultimately improving system usability and efficiency. To further improve the reliability and efficiency of information transmission and reconstruction within the framework, taking generative AI-enabled vehicle-to-vehicle (V2V) as a case study, a deep reinforcement learning (DRL)-based approach is proposed for resource allocation. Finally, we discuss potential research directions and anticipated advancements in the field of generative AI-enabled vehicular networks. IEEE',
    my_abstract: 'Consumers emotional and cognitive attachment to product design plays a pivotal role in influencing purchasing choices. Therefore, product designers incorporate this signal as they develop new products. The goal of our work is to reduce the psychological distance between designers and consumers in the automotive concept design process. While generative AI models hold the potential to amplify creativity, these models do not have any of this specialized knowledge. In this work, we developed a novel framework and system that combines machine learning, human aesthetic assessments, and visualization to support designers in organizing a large space of automotive wheel designs. We present a case study with 10 automotive designers using the tool to inspire novel wheel designs and end with a discussion of use cases and design implications for using this framework to support professional product design practice. © 2024 Owner/Author.',
    year: 2024,
    source: 'Scopus',
    source_url: 'https://www.scopus.com/inward/record.uri?eid=2-s2.0-85191231324&doi=10.1109%2fMNET.2024.3391767&partnerID=40&md5=dcb5a13aa666a943d547a8379511b5b4',
    my_ranking: 4,
    key_words: ['Accidents', 'Data models', 'DRL', 'Generative AI', 'generative AI', 'multi-modal', 'Navigation', 'Predictive models', 'Reliability', 'Training', 'Vehicular networks'],
    doi: '10.1109/MNET.2024.3391767',
    file: null, 
  };
  
  const save = (event) => {
    event.preventDefault();
    savePaper(paper)
      .then(response => {
        console.log('Respuesta:', response.data);
        // Hacer algo con la respuesta
      })
      .catch(error => {
        console.error('Error al guardar:', error);
        // Manejar el error
      });
  }

  function formChange(event) {
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
      <button type="submit" class="btn btn-primary" on:click={save}>
        <i class="fa fa-envelope"></i>Guardar Cambios
      </button>
    </div>
  </form>
  <hr>
  <h4 class="mb-4">Imagenes</h4>
</div>

<style>

</style>