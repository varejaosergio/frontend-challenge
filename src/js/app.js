const userPage = './lista-usuarios.html'

var botaoEntrar = document.querySelector("#form__entrar");

botaoEntrar.addEventListener("click", async function login (event) {
  
  event.preventDefault();
  setSpinner();

  var form = document.querySelector("#form__login");

  var email = form.email.value;
  var password = form.senha.value;

  var loginObj = {"email" : email, "password" : password };  
  var loginJSON = JSON.stringify (loginObj);
  
  await fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: [loginJSON]
  })
  .then((response) => response.json())
  .then((data) => {
    let token = data.token;
    if (token !== undefined && token !== null) {
      sessionStorage.setItem('token', token)
      window.location.href = userPage;                      
    } else {
      removeSpinner();
      setErrorMessage('Usuário ou senha incorretos');
    }    
  }) 
      
});

function setErrorMessage(message) {
  document.querySelectorAll('.form__error')[0].textContent = message;
  document.querySelectorAll('.form__error')[0].style.opacity = '1';

  setTimeout(() => {
    document.querySelectorAll('.form__error')[0].textContent = ' ';
  }, 2000);
}

function removeSpinner() {
  document.querySelectorAll('#form__entrar')[0].style.display = 'block';
  document.querySelectorAll('.form__spinner')[0].style.display = 'none';
}

function setSpinner() {
  document.querySelectorAll('#form__entrar')[0].style.display = 'none';
  document.querySelectorAll('.form__spinner')[0].style.display = 'block';
}