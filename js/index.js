$(document).ready(beginning);

function beginning(){
  scriptMarcelo();
  scriptIñigo();
  scriptImrane();
}

function scriptMarcelo(){
  $('button#login')
    .off('click')
    .on('click', login);
  $('button#register')
    .off('click')
    .on('click', register);
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
  console.log(1);
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