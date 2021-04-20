var erraseMessage = () => {
}
 
$(document).ready(function() {
  page.base('/login');
  page('/', function(){
    $('#login').show();
    $('#sign-in').hide();
    $('#forgot-password').hide();
    erraseMessage();
  });
  page('/sign-in', function(){
    $('#login').hide();
    $('#sign-in').show();
    $('#forgot-password').hide();
    erraseMessage();
  });
  page('/forgot-password', function(){
    $('#login').hide();
    $('#sign-in').hide();
    $('#forgot-password').show();
    erraseMessage();
  });
  page('*', function(){
    alert('notFound')
  })
  page();
});