<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
  import { navigate } from 'svelte-routing';
  import PaperList from '../pages/papers/PaperList.svelte';
  import TopicTagList from '../pages/papers/TopicTagList.svelte';
  import PaperDetail from '../pages/papers/PaperDetail.svelte';
  import Home from '../pages/papers/Home.svelte';
  import Contact from '../pages/papers/Contact.svelte';
  import TopicList from '../pages/papers/TopicList.svelte';
  import TopicSearchStringList from '../pages/papers/TopicSearchStringList.svelte';
  import SearchStringDetail from '../pages/papers/SearchStringDetail.svelte';
  export let basepath = '/';
  
  onMount(() => {
  
  });
  </script>
  
  <style></style>
  
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fluid">
    <div class="container">
      <a class="navbar-brand" href="/" on:click|preventDefault={() => {navigate('/')}}>Mis Artículos</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" on:click|preventDefault={() => {navigate('/')}}>Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/topic" on:click|preventDefault={() => {navigate('/topic')}}>Tópicos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/contact" on:click|preventDefault={() => {navigate('/contact')}}>Contacto</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Acceder</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  <Router basepath="{basepath}">
    <Route path="/" component={Home} />
    <Route path="/contact" component={Contact} />
    <Route path="/topic" component={TopicList} />
    
    <Route path="/topic/:_id/tag" let:params>
      <TopicTagList topic_id={params._id} />
    </Route>
    <!-- cadena de busqueda -->
    <Route path="/topic/:_id/search-string" let:params>
      <TopicSearchStringList topic_id={params._id} />
    </Route>
    <Route path="/topic/:_id/search-string/add" let:params>
      <SearchStringDetail topic_id={params._id} />
    </Route>
    <Route path="/topic/:topic_id/search-string/edit/:_id" let:params>
      <SearchStringDetail topic_id={params.topic_id} _id={params._id} />
    </Route>
    <!-- papers -->
    <Route path="/topic/:_id/paper" let:params>
      <PaperList topic_id={params._id} />
    </Route>
    <Route path="/topic/:_id/paper/add" let:params>
      <PaperDetail topic_id={params._id} />
    </Route>
    <Route path="/topic/:topic_id/paper/edit/:_id" let:params>
      <PaperDetail topic_id={params.topic_id} _id={params._id} />
    </Route>
    
  </Router>
  
  <footer class="bg-dark text-white pt-4">
    <div class="container">
      <div class="row">
        <!-- About Section -->
        <div class="col-md-4 mb-3">
          <h5>About Us</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
        </div>
        <!-- Quick Links Section -->
        <div class="col-md-4 mb-3">
          <h5>Quick Links</h5>
          <ul class="list-unstyled">
            <li>
              <a href="/" on:click|preventDefault={() => {navigate('/')}} class="text-white">Home</a>
            </li>
            <li>
              <a href="/about" on:click|preventDefault={() => {navigate('/about')}} class="text-white">Nosotros</a>
            </li>
            <li>
              <a href="/contact" on:click|preventDefault={() => {navigate('/contact')}} class="text-white">Contacto</a>
            </li>
          </ul>
        </div>
        <!-- Contact Section -->
        <div class="col-md-4 mb-3">
          <h5>Contact Us</h5>
          <ul class="list-unstyled">
            <li><i class="bi bi-geo-alt-fill"></i> 1234 Street Name, City, State, 56789</li>
            <li><i class="bi bi-envelope-fill"></i> email@example.com</li>
            <li><i class="bi bi-phone-fill"></i> (123) 456-7890</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center">
          <a href="#" class="text-white me-3"><i class="bi bi-facebook"></i></a>
          <a href="#" class="text-white me-3"><i class="bi bi-twitter"></i></a>
          <a href="#" class="text-white me-3"><i class="bi bi-instagram"></i></a>
          <a href="#" class="text-white"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
    </div>
    <div class="bg-light text-dark text-center py-3">
      <p class="mb-0">© 2024 Your Brand. All rights reserved.</p>
    </div>
  </footer>
  