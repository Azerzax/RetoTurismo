
/*Variables*/

var JSON_Login = "";
var JSON_bbdd = "";

/*Variables*/

$(document).ready(beginning);

function beginning(){
  bbdd();
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
  fetch("../JSON/bbdd.json")
  .then(function(data){return data.json();})
  .then(function(json){JSON_bbdd = JSON.parse(JSON.stringify(json));});

  fetch("../JSON/usuarios.json")
    .then(function(data){return data.json();})
    .then(function(json){JSON_Login = JSON.parse(JSON.stringify(json));})
    .then(function(){autoGen()});
    
  
    
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
      $("div#login").modal("hide");
      $("button#btnLogin").addClass("dropdown-toggle");
      $("form#login")[0].reset();
    }
  };
  return false;
}

function register(event){
  event.preventClick;
  var username = $(this).find('input#formUser').val();
  var email = $(this).find('input#formEmail').val();
  var password = $(this).find('input#formPassword').val();
  var password_x2 = $(this).find('input#formPasswordVerify').val();

  var specialsChar = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
  
  $("span.validation")[0].innerHTML = "";

  if(password != password_x2) { //Diferentes Password
    $("span.validation").removeClass("d-none");
    $("span.validation")[0].innerHTML = "Error Contraseña Diferentes";
  } else {
    if (password.length < 8) { //Verifica si la contraseña es mayor a 8
      $("span.validation").removeClass("d-none");
      $("span.validation")[0].innerHTML = "Contraseña muy corta";
    } else {
      var character = false;
      for(var i = 0; i < Array.from(password).length && character == false; i++) {
        if(Array.from(specialsChar).indexOf(Array.from(password)[i]) != "-1"){//Verifica si contiene un caracter especial
          character = true;
        }
      }
      var passwordVerify = false;
      for(var i = 0; i < Array.from(password).length && passwordVerify == false; i++) {
        if(!isNaN(Array.from(password)[i])){ //Verifica si contiene un numero
          passwordVerify = true;
        }
      }
  
      if (passwordVerify == false || character == false){
        $("span.validation").removeClass("d-none");
        $("span.validation")[0].innerHTML = "no cumple con las politicas de seguridad, requiere de un caracter especial y un numero";
      } else {
        $("button#btnLogin").attr("data-bs-toggle","dropdown");
        $("button#btnLogin")[0].innerHTML = username;
        $("div#login").modal("hide");
        $("button#btnLogin").addClass("dropdown-toggle");
        $("form#register")[0].reset();
      }
    }
  }
  return false;
}

function logout(event) {
  event.preventClick;
  $("button#btnLogin")[0].innerHTML = "Login";
  $("button#btnLogin").removeClass("dropdown-toggle");
  $("button#btnLogin").attr("data-bs-toggle","modal");
  $("div.dropdown-login").removeClass("show");
}

/*MARCELO SCRIPTS*/

/*IÑIGO SCRIPTS*/

function autoGen(){
  // console.log(JSON_bbdd['estancias'][i]);    PARA MOSTRAR SEGUN LA POSICION DE LA i
  $('div#carrusel_estancias')[0].innerHTML = "";



  for (var i = 0; i < JSON_bbdd['estancias'].length; i++) {

    $('div#carrusel_estancias')[0].innerHTML += "<div class='carousel-item items d-flex justify-content-center active'>";

    for (var j = 0; j < 3; index++) {
      
      $('div#carrusel_estancias')[0].innerHTML += "<div class='card cartas c1 col-4'>"
                                             +      "<img src='img/"+JSON_bbdd['estancias'][i]['nombre']+".jpg' class='card-img-top'>"
                                             +      "<div class='card-body'>"
                                             +        "<div class='ubicacion'>"
                                             +           "<img src='img/ubicacion.png'><p>"+JSON_bbdd['estancias'][i]['ubicacion']+"</p>"
                                             +        "</div>"
                                             +        "<h5 class='card-title'><a href=''>"+JSON_bbdd['estancias'][i]['nombre']+"</a></h5>"
                                             +      "<div class='estrellas'>"
                                             +        "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span>"
                                             +      "</div>"
                                             +      "<div class='precio'>"
                                             +        "<h5>"+JSON_bbdd['estancias'][i]['precio']+"€</h5>"
                                             +        "<p>por noche</p>"
                                             +      "</div>"
                                             +    "</div>";
      
    }

    $('div#carrusel_estancias')[0].innerHTML += "</div>";
  }
    /*
    $('div#carrusel_estancias')[0].innerHTML += "<div class='carousel-item items d-flex justify-content-center active'>"
                                             +    "<div class='card cartas c1 col-4'>"
                                             +      "<img src='img/"+JSON_bbdd['estancias'][i]['nombre']+".jpg' class='card-img-top'>"
                                             +      "<div class='card-body'>"
                                             +        "<div class='ubicacion'>"
                                             +           "<img src='img/ubicacion.png'><p>"+JSON_bbdd['estancias'][i]['ubicacion']+"</p>"
                                             +        "</div>"
                                             +        "<h5 class='card-title'><a href=''>"+JSON_bbdd['estancias'][i]['nombre']+"</a></h5>"
                                             +      "<div class='estrellas'>"
                                             +        "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span>"
                                             +      "</div>"
                                             +      "<div class='precio'>"
                                             +        "<h5>"+JSON_bbdd['estancias'][i]['precio']+"€</h5>"
                                             +        "<p>por noche</p>"
                                             +      "</div>"
                                             +    "</div>"
                                             +  "</div";
    
  
*/
  // $('div#cuerpo')[0].innerHTML = ""; //Limpieza div cuerpo

  

}

/*IÑIGO SCRIPTS*/

/*IMRANE SCRIPTS*/

/*IMRANE SCRIPTS*/