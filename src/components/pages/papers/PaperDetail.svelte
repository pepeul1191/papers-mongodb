<script>
  import { navigate } from 'svelte-routing';  
</script>

<div class="container mt-1">
  <h2 class="mb-4">Formulario de Artículo</h2>
  <form>
    <div class="row mb-3">
      <div class="col-md-1">
        <label for="inputAnio" class="form-label">Año</label>
        <input type="text" class="form-control" id="inputAnio" name="anio">
      </div>
      <div class="col-md-1">
        <label for="inputCalificacion" class="form-label">Calificacion</label>
        <input type="text" class="form-control" id="inputCalificacion" name="anio">
      </div>
      <div class="col-md-5">
        <label for="inputFuente" class="form-label">Fuente</label>
        <input type="text" class="form-control" id="inputFuente" name="fuente">
      </div>
      <div class="col-md-5">
        <label for="inputDOI" class="form-label">DOI</label>
        <input type="text" class="form-control" id="inputDOI" name="doi">
      </div>
    </div>
    <!-- Autores del artículo -->
    <div class="mb-3">
        <label for="autores" class="form-label">Autores del artículo</label>
        <input type="text" class="form-control" id="autores" name="autores">
    </div>
    <!-- Nombre -->
    <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="nombre" name="nombre">
    </div>
    <!-- Resumen del autor -->
    <div class="mb-3">
        <label for="resumenAutor" class="form-label">Resumen del autor</label>
        <textarea class="form-control" id="resumenAutor" name="resumenAutor" rows="3"></textarea>
    </div>
    <!-- Mi Resumen -->
    <div class="mb-3">
        <label for="miResumen" class="form-label">Mi Resumen</label>
        <textarea class="form-control" id="miResumen" name="miResumen" rows="3"></textarea>
    </div>
    <!-- Palabras Clave -->
    <div class="mb-3">
        <label for="palabrasClave" class="form-label">Palabras Clave</label>
        <input type="text" class="form-control" id="palabrasClave" name="palabrasClave">
    </div>
    <!-- Subir un Archivo -->
    <div class="mb-3">
        <label for="archivo" class="form-label">Subir un Archivo</label>
        <input type="file" class="form-control" id="archivo" name="archivo">
    </div>
    <button type="submit" class="btn btn-primary">Enviar</button>
  </form>
</div>

<style>

</style>