<script></script>

<svelte:head>
	<title>Contáctenos</title>
</svelte:head>

<div class="container">
  <div class="row">
    <div class="col-md-6">
      <h2 class="mb-4">Formulario de Contacto</h2>
      <form>
        <div class="form-group">
          <label for="name">Nombre</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            placeholder="Ingrese su nombre"
          />
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
          />
        </div>
        <div class="form-group">
          <label for="message">Mensaje</label>
          <textarea
            class="form-control"
            id="message"
            name="message"
            rows="4"
            placeholder="Ingrese su mensaje"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
    </div>
    <div class="col-md-6">
      <img src="https://media.istockphoto.com/id/530685719/es/foto/grupo-de-empresarios-de-pie-en-el-pasillo-sonriendo-y-hablando-juntos.jpg?s=2048x2048&w=is&k=20&c=FdTif-9QmtB-CnShFXphbfzvMkCRZ7UHfODI1Jr32Cw=" alt="Figura" class="img-fluid" />
    </div>
  </div>
</div>

<style>
  .container{
    margin-top: 20px;
  }
</style>