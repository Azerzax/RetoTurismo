
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
  // console.log("2")
  
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
  .then(function(json){JSON_bbdd = JSON.parse(JSON.stringify(json));})
  .then(function(){autoGen()});

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
  // console.log(JSON_bbdd['estancias']);    //PARA MOSTRAR SEGUN LA POSICION DE LA i
  var cont=1;

  for (var i = 0; i < JSON_bbdd['estancias'].length; i++) {
      
    $('div#'+cont)[0].innerHTML += "<a data-id='"+i+"' data-bs-toggle='modal' data-bs-target='#tarjetaModal' class='modalDeCarta'>"
                                +   "<div class='card cartas c1 col-4'>"
                                +     "<img src='img/"+JSON_bbdd['estancias'][i]['nombre']+".jpg' class='card-img-top'>"
                                +     "<div class='card-body'>"
                                +       "<div class='ubicacion'>"
                                +          "<img src='img/ubicacion.png'><p>"+JSON_bbdd['estancias'][i]['ubicacion']+"</p>"
                                +       "</div>"
                                +       "<h5 class='card-title a'>"+JSON_bbdd['estancias'][i]['nombre']+"</h5>"
                                +       "<div class='estrellas'>"
                                +         JSON_bbdd['estancias'][i]['rating']
                                +        "</div>" 
                                +       "<div class='precio'>"
                                +          "<h5>"+JSON_bbdd['estancias'][i]['precio']+"€</h5>"
                                +         "<p>por noche</p>"
                                +       "</div>"
                                +     "</div>"
                                +    "</div>"
                                +  "</a>";
    
    if ((i+1)%3==0) {
      cont++
    }

  }

  $('a.modalDeCarta')
    .off('click')
    .on('click', informacionCartasModal);

}

 
  // $('div#cuerpo')[0].innerHTML = ""; //Limpieza div cuerpo

  function informacionCartasModal(event) {
    event.preventClick;
    
    $('h5#modalCartasTitulo')[0].innerHTML = JSON_bbdd['estancias'][$(this).data("id")]['nombre'];

    $('div#modalCartasInfo')[0].innerHTML = "<div class='justify-content-center'><h5>"+JSON_bbdd['estancias'][$(this).data("id")]['nombre']+"</h5></div>"
                                          + "<div class='row'>"
                                          +   "<img class='col-lg-6 col-md-12 col-sm-12' src='img/"+JSON_bbdd['estancias'][$(this).data("id")]['nombre']+".jpg'>"
                                          +   "<div class='col-lg-6 col-md-12 col-sm-12'>"
                                          +     "<h4>Introduce de que dia hasta que dia quieres estar alojado en el siguiente establecimiento</h4><br>"
                                          +    "<div class='ubicacion'>"
                                          +     "<img src='img/ubicacion.png'><p>"+JSON_bbdd['estancias'][$(this).data("id")]['ubicacion']+"</p>"
                                          +    "</div>"
                                          +    "<div class='row'>"
                                          +     "<div class='col-5'>Ida<input type='date' class='form-control'></div>"
                                          +     "<div class='col-5'>vuelta<input type='date' class='form-control'></div>"
                                          +    "</div><br>"
                                          +    "<div class='row'>"
                                          +     "<div class='precio col-5'>"
                                          +      "<div class='estrellas'>"
                                          +       "Calificaciones:<br>"+JSON_bbdd['estancias'][$(this).data("id")]['rating']
                                          +      "</div>" 
                                          +      "Precio:<br><h5>"+JSON_bbdd['estancias'][$(this).data("id")]['precio']+"€</h5>"
                                          +      "<p>por noche</p>"
                                          +     "</div>" 
                                          +     "<div class='col-5'>" 
                                          +       "Adultos:<input class='form-control' type='number' value='0'>"
                                          +       "Niños:<input class='form-control' type='number' value='0'>"
                                          +     "</div>"
                                          +    "</div>"
                                          +   "<br><button type='button' class='btn btn-primary w-100'>Reservar</button>"
                                          +  "</div>";
}


/*IÑIGO SCRIPTS*/

/*IMRANE SCRIPTS*/

var pasajeros=document.querySelectorAll(".pasajeros");
var pasajerosA=document.getElementById("pasajerosA");
var pasajerosN=document.getElementById("pasajerosN");
var botonbuscar=document.getElementById("buscar1");
var divVuelos=document.getElementById("vuelos");

pasajerosA.value="1";
pasajerosN.value="0";

function setPasajeros() {
  pasajeros.forEach(element => element.value=pasajerosA.value+"A");
  if (pasajerosN.value!=0) {
    pasajeros.forEach(element => element.value+=", "+pasajerosN.value+"N");
  }
}

function buscarVuelos() {
  divVuelos.innerHTML="";
  var salida = document.getElementById("sal1").value;
  var dest = document.getElementById("dest1").value;
  var ida = document.getElementById("ida1").value;
  var vuelta = document.getElementById("vuelt1").value;
  var pasajerosA = document.getElementById("pasajerosA").value;
  var pasajerosN = document.getElementById("pasajerosN").value;

  

  if (salida=="" || dest=="" || ida=="" || vuelta=="" || pasajerosA=="" || pasajerosN=="") {
    alert("Faltan campos por rellenar");

  }else if (Date.parse(ida)>Date.parse(vuelta)) {
    alert("La vuelta no puede ser antes que la ida")

  }else {
    var flagIda=false;
    var flagVuelta=false

    JSON_bbdd['vuelos'].forEach(element => {
      var fecha = element["Fecha"].split(",");
      var precios = element["precio"].split("-");
      
      if (element["ubicacion"].toUpperCase().includes(salida.toUpperCase()) && element["ubicacion"].toUpperCase().includes(dest.toUpperCase()) & (fecha[0]==ida || fecha[0]==vuelta) ){
        var precioAdulto=parseInt(precios[0]);
        var cantidadAdultos=parseInt(pasajerosA);
        var precioNiño=parseInt(precios[1]);
        var cantidadNiños=parseInt(pasajerosN);

        if (fecha[0]==ida) {
          flagIda=true;
        }else if (fecha[0]==vuelta) {
          flagVuelta=true;
        }

        divVuelos.innerHTML+=element["ubicacion"]+"<br>";     
        divVuelos.innerHTML+="Precio: "+  ((precioAdulto*cantidadAdultos)+(precioNiño*cantidadNiños)) +" <br> " ;
        
      }
  
    });
    
    if (flagVuelta==false && flagIda==false) {
      divVuelos.innerHTML+="No se han encontrado resultados";
    }else if (flagVuelta==true && flagIda==false) {
      divVuelos.innerHTML+="No se han encontrado vuelos de ida";
    }else if (flagVuelta==false && flagIda==true) {
      divVuelos.innerHTML+="No se han encontrado vuelos de vuelta";
    }
    
  }

  

}


setPasajeros();
document.getElementById("pasajerosSave").onclick= setPasajeros;

botonbuscar.onclick= buscarVuelos;

/*IMRANE SCRIPTS*/