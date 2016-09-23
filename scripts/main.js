import { dataServer } from './dataServer.js';
import { router } from './routing.js';

$(() => { // on document ready
  const root = $('#root'),
    navbar = root.find('#nav-login-form'),
    mainNav = navbar.find('#main-nav'),
    contentContainer = $('#container'),
    loginForm = $('#login'),
    logoutForm = $('#logout'),
    registerForm = $('#register'),
    usernameSpan = $('#span-username'),
    usernameInput = $('#login-input'),
    userPassword=$('#login-password');

  router.init();

  // start login/logout
  navbar.on('click', '#btn-login', (ev) => {
    
    var user = {
      username: usernameInput.val() || 'anonymous',
      password: userPassword.val()
    };
    dataServer.users.login(user)
      .then((user) => {
        usernameInput.val('');
        usernameSpan.text(user);
        loginForm.addClass('hidden');
        registerForm.addClass('hidden');
        logoutForm.removeClass('hidden');
      });
  });

  navbar.on('click', '#btn-logout', (ev) => {
    dataServer.users.logout()
      .then(() => {
        usernameSpan.text('');
        loginForm.removeClass('hidden');
        registerForm.removeClass('hidden');
        logoutForm.addClass('hidden');
      });
  });
  // end login/logout
});

//start register
$('#btn-register').on('click', function () {
  var user = {
    username: $('#tb-user').val(),
    password: $('#tb-pass').val()
  };
  dataServer.users.register(user);
  console.log(user);
});
//end register