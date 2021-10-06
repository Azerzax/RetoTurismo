$(document).ready(beginning);

function beginning(){
  scriptMarcelo();
  scriptIñigo();
  scriptImrane();
}

function scriptMarcelo(){
  $('form#login')
    .off('click')
    .on('submit', login);
  $('form#register')
    .off('click')
    .on('submit', register);
}

function scriptIñigo(){
  $('button#login')
    .off('click')
    .on('click', login);
  $('button#register')
    .off('click')
    .on('click', register);
}

function scriptImrane(){
  $('button#login')
    .off('click')
    .on('click', login);
  $('button#register')
    .off('click')
    .on('click', register);
}

function preventClick(event){
  event.preventDefault();
  event.stopPropagation();
}

/*MARCELO SCRIPTS*/

function login(event){
  event.preventClick;
  var JSON_Login = fetch("../JSON/usuarios.json")
  .then(response => response.json())
  .then(json => console.log(json));
  var user = $(this).find('input#formEmail').val();
  var password = $(this).find('input#formPassword').val();
  
  return false;
}

function register(event){
  event.preventClick;
  console.log(2);
}

/*MARCELO SCRIPTS*/

/*IÑIGO SCRIPTS*/

/*IÑIGO SCRIPTS*/

/*IMRANE SCRIPTS*/

/*IMRANE SCRIPTS*/