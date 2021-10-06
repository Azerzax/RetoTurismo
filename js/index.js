
/*Variables*/

var JSON_Login = "";

/*Variables*/

$(document).ready(beginning);

function beginning(){
  scriptMarcelo();
  scriptIñigo();
  scriptImrane();
}

function scriptMarcelo(){

  bbdd();

  $('form#login')
    .off('click')
    .on('submit', login);
  $('form#register')
    .off('click')
    .on('submit', register);
  $('button#btnLogout')
    .off('click')
    .on('click', logout);
}

function scriptIñigo(){
}

function scriptImrane(){
}

function preventClick(event){
  event.preventDefault();
  event.stopPropagation();
}

/*MARCELO SCRIPTS*/

function bbdd() {
  fetch("../JSON/usuarios.json")
    .then(function(data){return data.json();})
    .then(function(json){JSON_Login = JSON.parse(JSON.stringify(json));});
  
}

function login(event){
  event.preventClick;

  var status = false;
  var email = $(this).find('input#formEmail').val();
  var password = $(this).find('input#formPassword').val();

  for (var i = 0; i < JSON_Login["account"].length && status == false; i++) {
    if (email == JSON_Login["account"][i]["email"] && password == JSON_Login["account"][i]["password"]){
      status = true;
      console.log("Logged");
      $("button#btnLogin").attr("data-bs-toggle","dropdown");
      $("button#btnLogin")[0].innerHTML = JSON_Login["account"][i]["user"];
    }
  };
  $("div#login").modal("hide");
  $("button#btnLogin").addClass("dropdown-toggle");
  return false;
}

function register(event){
  event.preventClick;
  console.log(2);
}

function logout(event) {
  event.preventClick;
  console.log(1);
}

/*MARCELO SCRIPTS*/

/*IÑIGO SCRIPTS*/

/*IÑIGO SCRIPTS*/

/*IMRANE SCRIPTS*/

/*IMRANE SCRIPTS*/