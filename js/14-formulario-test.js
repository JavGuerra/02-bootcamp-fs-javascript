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
let requerido = {nombre: false, apellidos: false, correo: false};

form.nombre.onkeypress    = validaChars;
form.nombre.onchange      = validaRequeridos;
form.apellidos.onkeypress = validaChars;
form.apellidos.onchange   = validaRequeridos;
form.deporte.onkeypress   = validaChars;
form.telefono.onkeypress  = validaCharTel;
form.correo.onchange      = validaRequeridos;

form.onsubmit   = prevenirEvento;
enviar.onclick  = validaForm;

enviar.disabled = true;


function elemento(sel) { return document.querySelector(sel); }

function creaElem(el)  { return document.createElement(el);  }

function prevenirEvento(evento) { evento.preventDefault(); }

function validaForm() {
  if ( validaApellidos() && validaEdad() ) {

    // this.submit();
    this.reset(); // Borra el formulario

    resulta.textContent = ''; // Si hay algo en el div #resultado, lo borra
    resulta.appendChild( divInfo() );
  }
}

/* Devuelve un div con la info del formulario */
function divInfo() {
  let divInfo, div;
  let nombre    = form.nombre.value.trim();
  let apellidos = form.apellidos.value.trim();
  let edad      = form.edad.value.trim();
  let fecha     = form.fecha.value.trim();
  let sexo      = form.sexo.value.trim();
  let deporte   = form.deporte.value.trim();
  let color     = form.color.value.trim();
  let curiosa   = form.curiosidad.value.trim();
  let telefono  = form.telefono.value.trim();
  let correo    = form.correo.value.trim();
  let ciudad    = form.ciudad.value.trim();
  let repetido  = '<div class="valor"><span class="etiqueta">';

  divInfo = creaElem('div');
  divInfo.setAttribute("id", "info");
  divInfo.innerHTML =  '<h2>Datos recibidos desde el formulario</h2>';

  div = creaElem('div');
  div.classList.add('valores');

  div.innerHTML = `${repetido}Nombre completo:</span> ${nombre} ${apellidos}</div>`;
  if (edad)     div.innerHTML += `${repetido}Edad:</span> ${edad}</div>`;           
  if (fecha)    div.innerHTML += `${repetido}Nacimiento:</span> ${fecha}</div>`;
  if (sexo)     div.innerHTML += `${repetido}Sexo:</span> ${sexo}</div>`;
  if (deporte)  div.innerHTML += `${repetido}Deporte favorito:</span> ${deporte}</div>`;
  if (color)    div.innerHTML += `${repetido}Color favorito:</span> ${color}</div>`;
  if (telefono) div.innerHTML += `${repetido}Teléfono:</span> ${telefono}</div>`;
  div.innerHTML += `${repetido}Correo:</span> ${correo}</div>`;
  if (ciudad)   div.innerHTML += `${repetido}Ciudad:</span> ${ciudad}</div>`;
  if (curiosa) {div.innerHTML += 
    `<div><span class="etiqueta">Alguna curiosidad:</span> ${curiosa}</div>`;
  }

  divInfo.appendChild(div);

  return divInfo;
}

function validaRequeridos() {
  requerido.nombre    = form.nombre.value    ? true : false; 
  requerido.apellidos = form.apellidos.value ? true : false; 
  requerido.correo    = form.correo.value    ? true : false; 
  enviar.disabled = !(requerido.nombre && requerido.apellidos && requerido.correo);
}

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

function validaChars(evento) {
  let charCode = evento.charCode;
  if (charCode != 0) {
      let caracter = String.fromCharCode(charCode);
      let exprRegl = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s-]$/;
      if (!exprRegl.test(caracter)) {
      evento.preventDefault();
    }
  }
}

function validaCharTel(evento) {
  let charCode = evento.charCode;
  if (charCode != 0) {
    let caracter = String.fromCharCode(charCode);
    let exprRegl = /^[\+-\s\d]$/;
    if (!exprRegl.test(caracter)) {
      evento.preventDefault();
      alert("Usa sólo números, espacios, guiones y el '+'.\n"
        + `Carácter recibido: '${caracter}', charCode: ${charCode}\n`
      );
    }
  }
}