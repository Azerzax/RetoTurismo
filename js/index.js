$(document).ready(beginning);

function beginning(){
  scriptMarcelo();
}

function scriptMarcelo(){
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

function login(event){
  event.preventClick;
  console.log(1);
}

function register(event){
  event.preventClick;
  console.log(2);
}

