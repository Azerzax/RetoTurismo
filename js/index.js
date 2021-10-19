
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
      
    $('div#'+cont)[0].innerHTML += "<a data-id='"+i+"' data-bs-toggle='modal' data-bs-target='#tarjetaModal' class='modalDeCarta col-12 col-sm-4'>"
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
var buscarVuel=document.getElementById("buscar1");
var buscarHot=document.getElementById("buscar3");
var divVuelos=document.getElementById("resultadosVuelos");

pasajerosA.value="1";
pasajerosN.value="0";

function setPasajeros() {
  pasajeros.forEach(element => element.value=pasajerosA.value+"A");
  if (pasajerosN.value!=0) {
    pasajeros.forEach(element => element.value+=", "+pasajerosN.value+"N");
  }
}



var vuelosIda=new Array();
var vuelosVuelta=new Array();



function buscarVuelos() {

  var vuelosIda=new Array();
  var vuelosVuelta=new Array();

  
  var salida = document.getElementById("sal1").value;
  var destino = document.getElementById("dest1").value;
  var ida = document.getElementById("ida1").value;
  var vuelta = document.getElementById("vuelt1").value;
  var pasajerosA = document.getElementById("pasajerosA").value;
  var pasajerosN = document.getElementById("pasajerosN").value;


  
  var cantidadAdultos=parseInt(pasajerosA);
  
  var cantidadNiños=parseInt(pasajerosN);

  

  if (salida=="" || destino=="" || ida=="" || vuelta=="" || pasajerosA=="" || pasajerosN=="") {
    alert("Faltan campos por rellenar");

  }else if (Date.parse(ida)>Date.parse(vuelta)) {
    alert("La vuelta no puede ser antes que la ida")

  }else {
    divVuelos.innerHTML="";
    document.getElementById("cuerpo2").innerHTML="";
    document.getElementById("cuerpo2").style.display="none";
    var flagIda=false;
    var flagVuelta=false;

    

    JSON_bbdd['vuelos'].forEach(element => {
      var ubicaciones=element["ubicacion"].split("-");
      var ubicSalida=ubicaciones[0];
      var ubicDestino=ubicaciones[1];
      var fecha = element["Fecha"].split(",");
      
      
      if (ubicSalida.toUpperCase().includes(salida.toUpperCase()) && ubicDestino.toUpperCase().includes(destino.toUpperCase())) {
        if (fecha[0]==ida) {
          flagIda=true;
          vuelosIda.push(element);
        }       
      }else if (ubicDestino.toUpperCase().includes(salida.toUpperCase()) && ubicSalida.toUpperCase().includes(destino.toUpperCase())) {
        if(fecha[0]==vuelta) {
          flagVuelta=true;
          vuelosVuelta.push(element);
        }
      }

    });


    if (flagIda && flagVuelta) {
      vuelosIda.forEach(vueloIda => {

        var ubicacionesI=vueloIda.ubicacion.split("-");
        var ubicSalidaI=ubicacionesI[0].split(",");
        var ubicDestinoI=ubicacionesI[1].split(",");
        var fechaI = vueloIda.Fecha.split(",");

        var preciosI = vueloIda.precio.split("-");
        var precioAdultoI=parseInt(preciosI[0]);
        var precioNiñoI=parseInt(preciosI[1]);

        vuelosVuelta.forEach(vueloVuelta => {

          var ubicacionesV=vueloVuelta.ubicacion.split("-");
          var ubicSalidaV=ubicacionesV[0].split(",");
          var ubicDestinoV=ubicacionesV[1].split(",");
          var fechaV = vueloVuelta.Fecha.split(",");

          var preciosV = vueloVuelta.precio.split("-");
          var precioAdultoV=parseInt(preciosV[0]);
          var precioNiñoV=parseInt(preciosV[1]);

          divVuelos.innerHTML+= "<div id='vuelos' class='p-3  mb-5 row'>"

                                
                                +    "<div class='col'><!--Info-->"
                                  
                                  
                                +      "<div class='row py-2 vuelo'> <!--Ida-->"
                                +        "<img src='img/"+vueloIda.img+"' class='col-4 aerolineaImg' >"
                                +        "<div class='col-8 d-flex justify-content-evenly infoVuelo'>"
                                +         "<div class='d-flex flex-column'>"
                                +            "<p class='hora'>"+fechaI[1]+"</p>"
                                +            "<p class='lugar'>"+ubicSalidaI[1]+"</p>"
                                +          "</div>"
                                +          "<div class='d-flex flex-column'>"
                                            
                                +           "<img src='img/flecha.png' class='imgFlecha'>"
                                            
                                +          "</div>"
                                +          "<div class='d-flex flex-column'>"
                                +           " <p class='hora'>"+fechaI[2]+"</p>"
                                +            "<p class='lugar'>"+ubicDestinoI[1]+"</p>"
                                +          "</div>"
                                +        "</div>"
                                +      "</div>"
                                  
                                  
                                +      "<div class='row py-2 vuelo'> <!--Ida-->"
                                +       "<img src='img/"+vueloVuelta.img+"' class='col-4 aerolineaImg' >"
                                +        "<div class='col-8 d-flex justify-content-evenly infoVuelo'>"
                                +          "<div class='d-flex flex-column'>"
                                +            "<p class='hora'>"+fechaV[1]+"</p>"
                                +            "<p class='lugar'>"+ubicSalidaV[1]+"</p>"
                                +          "</div>"
                                +          "<div class='d-flex flex-column'>"
                                           
                                +            "<img src='img/flecha.png' class='imgFlecha'>"
                                            
                                +         "</div>"
                                +          "<div class='d-flex flex-column'>"
                                +            "<p class='hora'>"+fechaV[2]+"</p>"
                                +           " <p class='lugar'>"+ubicDestinoV[1]+"</p>"
                                +          "</div>"
                                +        "</div>"
                                +      "</div>"
                                  
                                  
                                +   " </div>"
                                  
                                +    "<div class=' divprecio col-12 col-md-2 bg-light d-flex flex-column justify-content-center'> <!--Precio-->"
                                +      "<h4 class=' '>"+((precioAdultoV*cantidadAdultos)+(precioNiñoV*cantidadNiños)+(precioNiñoI*cantidadNiños)+(precioAdultoI*cantidadAdultos))+"€</h4>"
                                +      "<button value='"+vuelosIda.indexOf(vueloIda)+"-"+vuelosVuelta.indexOf(vueloVuelta)+"' class='btn btn-primary'>Reservar</button>"
                                +    "</div>"
                                    
                                  
                                  
                                +  "</div>"

        });


      });


      var cont=0;
      for (var i = 0; i < JSON_bbdd['estancias'].length; i++) {
        
        if (JSON_bbdd['estancias'][i]['ubicacion'].toUpperCase().includes(destino.toUpperCase())) {
          
          

          if (cont==0) {
            document.getElementById("cuerpo2").style.display="flex";
            document.getElementById("cuerpo").style.display="none";
            document.getElementById("cuerpo2").innerHTML+="<div class='text-center mt-3 mb-3'>"
                                                      +  "<p id='titulohoteles'>Estancias de interes</p>"
                                                      + "</div>"
          }
          
          cont++;

          //document.getElementById("cuerpo2").style.border="10px solid #57A99A";

          document.getElementById("cuerpo2").innerHTML+="<div class='cartaGrande mt-5 mb-5 col-sm-10 col-md-10 col-lg-10'>"
					+ "<div class='hotel-card bg-white rounded-lg shadow overflow-hidden d-block d-lg-flex'>"
					+	"<div class='hotel-card_img'>"
							
          +			"<div class=''>"
          +       "<img src='img/"+JSON_bbdd['estancias'][i]['nombre']+".jpg' class='d-block w-100' alt='Hotel Image'>"
          +			"</div>"

					+	"</div>"
					+	"<div class='hotel-card_info p-4'>"
					+		"<div class='d-flex align-items-center mb-2'>"
					+		"	<h5 class='mb-0 m-2'>"+JSON_bbdd['estancias'][i]['nombre']+"</h5>"
					+		"<div class='estrellas'>"
          +         JSON_bbdd['estancias'][i]['rating']
          +        "</div>"
					+		"</div>"
					+		"<div class='d-flex justify-content-between align-items-end'>"
					+			"<div class='hotel-card_details'>"
					+				"<div class='ubicacion text-muted mb-2'><img src='img/ubicacion.png'><p class='ms-3' >"+JSON_bbdd['estancias'][i]['ubicacion']+"</p></div>"
					+				"<div class='amnities d-flex mb-3'>"
					+					"<img class='m-2' src='img/icons/desk-bell.svg' data-toggle='tooltip' data-placement='top' title='Desk bell' alt='Desk bell'>"
					+					"<img class='m-2' src='img/icons/single-bed.svg' data-toggle='tooltip' data-placement='top' title='Single Bed' alt='Single Bed'>"
					+					"<img class='m-2' src='img/icons/towels.svg' data-toggle='tooltip' data-placement='top' title='Towels' alt='Towels'>"
					+					"<img class='m-2' src='img/icons/wifi.svg' data-toggle='tooltip' data-placement='top' title='Wifi' alt='Wifi'>"
					+				"</div>"
					+				"<ul class='hotel-checklist p-0 mb-0'>"
					+					"<li><i class='fa fa-check text-success'></i> Lorem ipsum dolor</li>"
					+					"<li><i class='fa fa-check text-success'></i> Cras lectus purus, </li>"
					+					"<li><i class='fa fa-check text-success'></i> ornare eget congue</li>"
					+				"</ul>"
					+			"</div>"
					+			"<div class='hotel-card_pricing text-center'>"
					+				"<h3>"+JSON_bbdd['estancias'][i]['precio']+"€</h3>"
					
					+				"<button class='btn btn-primary'>Reservar</button>"
					+			"</div>"
					+		"</div>"
					+	"</div>"
					+ "</div>"
				  + "</div>"

          /*
          document.getElementById("cuerpo").innerHTML="<a data-id='"+i+"' data-bs-toggle='modal' data-bs-target='#tarjetaModal' class='modalDeCartaGrande'>"
                                                      +   "<div class='card' style='width: 18rem;'>"
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
                                                      */
        }
        
      }

      

    }else{
      document.getElementById("cuerpo").style.display="block";
      divVuelos.innerHTML="<div class='text-center'>"
      +  "<h2>x</h2><p>No se han encontrado resultados para tu busqueda</p><h2>x</h2>"
      + "</div>";
    }
    
  }

  

}


function buscarHoteles(){
  var hotel = document.getElementById("hotel").value;
  if (hotel == null || hotel == "") {
    alert("Introduce el nombre o la ubicacion del hotel")
  }else{

    document.getElementById("resultadosHoteles").innerHTML="";

    for (var i = 0; i < JSON_bbdd['estancias'].length; i++) {
      
      if (JSON_bbdd['estancias'][i]['ubicacion'].toUpperCase().includes(hotel.toUpperCase())) {  
        
        document.getElementById("carouselExampleControls").innerHTML="";

        document.getElementById("resultadosHoteles").style.display="flex";

        document.getElementById("resultadosHoteles").innerHTML+="<div class='cartaGrande mb-5 col-sm-10 col-md-10 col-lg-10'>"
        + "<div class='hotel-card bg-white rounded-lg shadow overflow-hidden d-block d-lg-flex'>"
        +	"<div class='hotel-card_img'>"
            
        +			"<div class=''>"
        +       "<img src='img/"+JSON_bbdd['estancias'][i]['nombre']+".jpg' class='d-block w-100' alt='Hotel Image'>"
        +			"</div>"

        +	"</div>"
        +	"<div class='hotel-card_info p-4'>"
        +		"<div class='d-flex align-items-center mb-2'>"
        +		"	<h5 class='mb-0 m-2'>"+JSON_bbdd['estancias'][i]['nombre']+"</h5>"
        +		"	<div>"
        +				"<i class='fa fa-star text-warning'></i>"
        +				"<i class='fa fa-star text-warning'></i>"
        +				"<i class='fa fa-star text-warning'></i>"
        +				"<i class='fa fa-star text-warning'></i>"
        +				"<i class='fa fa-star text-warning'></i>"
        +			"</div>"
        +		"</div>"
        +		"<div class='d-flex justify-content-between align-items-end'>"
        +			"<div class='hotel-card_details'>"
        +				"<div class='ubicacion text-muted mb-2'><img src='img/ubicacion.png'><p class='ms-3' >"+JSON_bbdd['estancias'][i]['ubicacion']+"</p></div>"
        +				"<div class='amnities d-flex mb-3'>"
        +					"<img class='m-2' src='img/icons/desk-bell.svg' data-toggle='tooltip' data-placement='top' title='Desk bell' alt='Desk bell'>"
        +					"<img class='m-2' src='img/icons/single-bed.svg' data-toggle='tooltip' data-placement='top' title='Single Bed' alt='Single Bed'>"
        +					"<img class='m-2' src='img/icons/towels.svg' data-toggle='tooltip' data-placement='top' title='Towels' alt='Towels'>"
        +					"<img class='m-2' src='img/icons/wifi.svg' data-toggle='tooltip' data-placement='top' title='Wifi' alt='Wifi'>"
        +				"</div>"
        +				"<ul class='hotel-checklist p-0 mb-0'>"
        +					"<li><i class='fa fa-check text-success'></i> Lorem ipsum dolor</li>"
        +					"<li><i class='fa fa-check text-success'></i> Cras lectus purus, </li>"
        +					"<li><i class='fa fa-check text-success'></i> ornare eget congue</li>"
        +				"</ul>"
        +			"</div>"
        +			"<div class='hotel-card_pricing text-center'>"
        +				"<h3>"+JSON_bbdd['estancias'][i]['precio']+"€</h3>"
        
        +				"<button class='btn btn-primary'>Reservar</button>"
        +			"</div>"
        +		"</div>"
        +	"</div>"
        + "</div>"
        + "</div>"
      }
      
    }

  }
}


setPasajeros();
document.getElementById("pasajerosSave").onclick= setPasajeros;

buscarVuel.onclick= buscarVuelos;
buscarHot.onclick= buscarHoteles;

/*IMRANE SCRIPTS*/