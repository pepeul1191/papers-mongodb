<script>
  import { navigate } from 'svelte-routing';  
</script>


<h1>Lista de Articulos</h1>
<a class="nav-link active" href="/paper/add" aria-current="page" on:click|preventDefault={() => {navigate('/paper/add')}}>Agregar Paper</a>

<style>

</style>