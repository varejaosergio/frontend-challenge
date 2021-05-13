const userPage = './lista-usuarios.html'

var botaoEntrar = document.querySelector("#entrar");

botaoEntrar.addEventListener("click", async function login (event) {
  
  event.preventDefault();

  var form = document.querySelector("#login");

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
      setSpinner();                
    } else {
      removeSpinner();
      setErrorMessage('Usuário ou senha incorretos');
    }    
  }) 
      
});

function setErrorMessage(message) {
  document.querySelectorAll('.login-error')[0].textContent = message;
  document.querySelectorAll('.login-error')[0].style.opacity = '1';

  setTimeout(() => {
    document.querySelectorAll('.login-error')[0].textContent = ' ';
  }, 2000);
}

function removeSpinner() {
  document.querySelectorAll('#entrar')[0].style.display = 'block';
  //document.querySelectorAll('.smooth-spinner')[0].style.display = 'none';
}

function setSpinner() {
  document.querySelectorAll('#entrar')[0].style.display = 'none';
  //document.querySelectorAll('.smooth-spinner')[0].style.display = 'block';
}