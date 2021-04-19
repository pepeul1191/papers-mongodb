$(document).ready(function() {
  page.base('/login');
  page('/', function(){
    $('#login').show();
    $('#sign-in').hide();
    $('#forgot-password').hide();
  });
  page('/sign-in', function(){
    $('#login').hide();
    $('#sign-in').show();
    $('#forgot-password').hide();
  });
  page('/forgot-password', function(){
    $('#login').hide();
    $('#sign-in').hide();
    $('#forgot-password').show();
  });
  page('*', function(){
    alert('notFound')
  })
  page();
});