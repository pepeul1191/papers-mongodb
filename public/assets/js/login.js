var erraseMessage = () => {
}
 
$(document).ready(() => {
  page.base('/login');
  page('/', () =>{
    $('#login').show();
    $('#sign-in').hide();
    $('#forgot-password').hide();
    erraseMessage();
  });
  page('/sign-in', () =>{
    $('#login').hide();
    $('#sign-in').show();
    $('#forgot-password').hide();
    erraseMessage();
  });
  page('/forgot-password', () =>{
    $('#login').hide();
    $('#sign-in').hide();
    $('#forgot-password').show();
    erraseMessage();
  });
  page('*', () =>{
    alert('notFound')
  })
  page();
});