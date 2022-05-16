/*
Cogemos el ejercicio del formulario de cuando dimos html. Cuando le des al
botón de enviar formulario capturas el evento y se validan los campos del
formulario. Si los datos están todos bien, presentar los datos. El ejemplo que
puso fue una ficha personal, pero dijo que podía hacerse de la forma que se
quiera. Una vez este la funcionalidad esa hecha, si da tiempo, aplicar Flexbox
al formulario para dejarlo medio bonito y sin los br tan feos que usamos en su día.
*/
// Nota: onclick vs addEventListener
// https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick


const resulta = elemento('#resultado');
const enviar  = elemento('#enviar');
const form    = document.formulario; // alt. document.getElementsByName()[0];
let completo  = {nombre: false, apellidos: false, correo: false};

let letras = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s-]$/;
let numers = /^\d$/;
let numtel = /^[\+-\s\d]$/;

form.nombre.onkeypress    = evento => validaChar(evento, letras);
form.apellidos.onkeypress = evento => validaChar(evento, letras);
form.edad.onkeypress      = evento => validaChar(evento, numers);
form.deporte.onkeypress   = evento => validaChar(evento, letras);
form.telefono.onkeypress  = evento => validaChar(evento, numtel);

form.nombre.onchange      = validaRequeridos;
form.apellidos.onchange   = validaRequeridos;
form.correo.onchange      = validaRequeridos;

enviar.onclick  = validaForm;

enviar.disabled = true;


function elemento(sel) { return document.querySelector(sel); }

function creaElem(el)  { return document.createElement(el);  }

/* ¿El formulario está correcto? */
function validaForm() {
  if ( validaApellidos() && validaEdad() && form.checkValidity()) {

    resulta.textContent = ''; // Si hay algo en el div #resultado, lo borra
    resulta.appendChild( divInfo() );

    form.reset(); // Borra el formulario
    // form.submit();
  }
}

/* Devuelve un div con la info del formulario */
function divInfo() {
  let divInfo, div, nombre, valor;
  let formData = new FormData(form);

  divInfo = creaElem('div');
  divInfo.setAttribute("id", "info");
  divInfo.innerHTML =  '<h2>Datos recibidos desde el formulario</h2>';

  div = creaElem('div');
  div.classList.add('valores');

  for ([nombre, valor] of formData.entries()) {
    if (nombre != 'curiosidad' && valor.trim()) {
      div.innerHTML += '<div class="valor"><span class="etiqueta">'
        + `${nombre}:</span> ${valor}</div>`;
    }
  }

  divInfo.appendChild(div);

  if (form.curiosidad.value.trim()) {
    divInfo.innerHTML += '<div id="areaVal"><span class="etiqueta">curiosidad:'
      + `</span> ${form.curiosidad.value.trim()}</div>`;
  }

  return divInfo;
}

/* Valida que los campos requeridos estén completados */
function validaRequeridos() {
  completo.nombre    = form.nombre.value    ? true : false; 
  completo.apellidos = form.apellidos.value ? true : false; 
  completo.correo    = form.correo.value    ? true : false;

  enviar.disabled = !(completo.nombre && completo.apellidos && completo.correo);
}

/* Valida que haya al menos dos apellidos separados por espacios en apellidos */
function validaApellidos() {
  let valida = true;
  let error = '';
  if (!form.apellidos.value.trim().includes(' ')) {
    error  = 'Debes incluir todos los apellidos.';
    valida = false;
  }
  form.apellidos.setCustomValidity(error);

  return valida;
}

/* Valida los valores introducidos en los campos edad y fecha */
function validaEdad() {
  let valida = true;
  let errorE = errorF = '';

  if (form.edad.value && form.edad.value < 16) {
    errorE = 'No tienes la edad requerida.';
    valida = false;
  } else if (form.fecha.value) {
    let annFe = form.fecha.value.substr(0,4); // Año de la fecha
    let hoy   = new Date();
    let annio = hoy.getFullYear(); // Año actual
    if (form.edad.value && form.fecha.value) {
      // ¿Coinciden edad y fecha de nacimiento?  
      if (form.edad.value != (annio - annFe)) {
        errorF = 'La fecha no coincide con la edad.';
        valida = false;
      }
    } else {
      // ¿Hace menos de 16 años desde que nació?
      if ((annio - annFe) < 16) { 
        errorF = 'No tienes la edad requerida.';
        valida = false;
      }
    }
  }
  form.edad.setCustomValidity(errorE);
  form.fecha.setCustomValidity(errorF);

  return valida;
}

/* Valida caracteres introducidos en un campo */
function validaChar(evento, exprRegl) {
  let charCode = evento.charCode;
  if (charCode != 0) {
      let caracter = String.fromCharCode(charCode);
      if (!exprRegl.test(caracter)) {
      evento.preventDefault();
    }
  }
}
