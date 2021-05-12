axios = require("axios");
style = require("./style.scss");

const userPage = './lista-usuarios.html'
var botaoEntrar = document.querySelector("#entrar");

botaoEntrar.addEventListener("click", async function login (event) {

  event.preventDefault();

  var form = document.querySelector("#login");

  var email = form.email.value;
  var password = form.senha.value;

  var loginObj = {"email" : email, "password" : password };  
  var loginJSON = JSON.stringify (loginObj);
  
  axios.post('https://reqres.in/api/login', {
    entrar: loginJSON
  })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    })
    .then((data) => {
      let token = data.token;
      if (token !== undefined && token !== null) {
        sessionStorage.setItem('token', token)
        window.location.href = userPage;
        setSpinner();        
      } else {
        removeSpinner();
        setErrorMessage('Usuário ou senha incorretos');
      }    
    })    
});

function removeSpinner() {
  document.querySelectorAll('#entrar')[0].style.display = 'block';
  document.querySelectorAll('.smooth-spinner')[0].style.display = 'none';
}

function setSpinner() {
  document.querySelectorAll('#entrar')[0].style.display = 'none';
  document.querySelectorAll('.smooth-spinner')[0].style.display = 'block';
}