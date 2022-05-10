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

// TODO poner color rojo a campos inválidos


const resulta = elemento('#resultado');
const enviar  = elemento('#enviar');
const form    = document.formulario; // document.getElementsByName()[0];
let requerido = {nombre: false, apellidos: false, correo: false};

form.nombre.onkeypress    = validaChars;
form.nombre.onchange      = validaRequeridos;
form.apellidos.onkeypress = validaChars;
form.apellidos.onchange   = validaRequeridos;
form.deporte.onkeypress   = validaChars;
form.telefono.onkeypress  = validaCharTel;
form.correo.onchange      = validaRequeridos;

form.onsubmit             = validaForm; // form.addEventListener('submit', validar);

enviar.disabled = true;


function elemento(sel) { return document.querySelector(sel); }

function creaElem(el)  { return document.createElement(el);  }

function validaForm(evento) {
  evento.preventDefault(); // Evita que el evento siga su curso

  if ( validaApellidos() && validaFecha() ) {

    resulta.textContent = ''; // Si hay algo en el div #resultado, lo borra
    resulta.appendChild( divInfo() );

    // this.submit(); // Sigue el curso del action del formulario
    this.reset(); // Está implícito en submit() pero no tenemos dónde enviar
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

  if (requerido.nombre && requerido.apellidos && requerido.correo) {
    enviar.disabled = false;
  } else {
    enviar.disabled = true;
  }
}

function validaApellidos() {
  let valida = true;
  let error = '';
  if (!form.apellidos.value.trim().includes(' ')) {
    // form.apellidos.focus();
    // alert('Debes incluir todos los apellidos.');
    valida = false;
    error  = 'Debes incluir todos los apellidos.';
  }
  form.apellidos.setCustomValidity(error);
  return valida;
}

function validaFecha() {
  let valida = true;

  if (form.edad.value && form.edad.value < 16) {

    form.edad.focus();
    alert('No tienes la edad requerida.');
    // TODO form.edad.setCustomValidity('No tienes la edad requerida.');

    valida = false;
  } else if (form.fecha.value) {
    let annFe = form.fecha.value.substr(0,4);
    let hoy   = new Date();
    let annio = hoy.getFullYear();
    if (form.edad.value && form.fecha.value) {
      console.log(annio, annFe, annio - annFe);
      if (form.edad.value != (annio - annFe)) {

        form.fecha.focus();
        alert('La fecha no coincide con la edad.');
        // TODO form.fecha.setCustomValidity('La fecha no coincide con la edad.');

        valida = false;
      }
    } else {
      if ((annio - annFe) < 16) { 

        form.fecha.focus();
        alert('No tienes la edad requerida.');
        // TODO form.fecha.setCustomValidity('No tienes la edad requerida.');

        valida = false;
      }   
    }
  }
  return valida;
}

function validaChars(e) {
  let charCode = e.charCode;
  if (charCode != 0) {
    if (!(charCode >= 65   &&  charCode <= 90 ) &&
        !(charCode >= 97   &&  charCode <= 122) &&
        !(charCode >= 128  &&  charCode <= 154) &&
        !(charCode >= 160  &&  charCode <= 165) &&
        !(charCode >= 181  &&  charCode <= 183) &&
        !(charCode >= 198  &&  charCode <= 199) &&
        !(charCode >= 208  &&  charCode <= 216) &&
        !(charCode >= 224  &&  charCode <= 237) &&
        !(charCode == 222) && !(charCode == 45) &&
        !(charCode == 32) ) {
      e.preventDefault();
    }
  }
}

function validaCharTel(e) {
  let charCode = e.charCode;
  if (charCode != 0) {
    // TODO Con RegExp molaría más
    if (!(charCode >= 48  &&  charCode <= 57 ) &&
        !(charCode >= 40  &&  charCode <= 41 ) &&
        !(charCode == 32) && !(charCode == 43) ) {
      e.preventDefault();
      alert("Usa sólo números, espacios, paréntesis y '+'." + "\n" + "Carácter recibido: '"
            + String.fromCharCode(charCode) + "', charCode: " + charCode + ".\n"
      );
    }
  }
}