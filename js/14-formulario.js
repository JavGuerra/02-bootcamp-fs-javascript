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
// TODO revisar los setCustomValidity()


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

form.onsubmit             = validaForm; // alt. form.addEventListener('submit', validar);

enviar.disabled = true;


function elemento(sel) { return document.querySelector(sel); }

function creaElem(el)  { return document.createElement(el);  }

function validaForm(evento) {
  evento.preventDefault(); // Evita que el evento submit siga su curso y envíe el form.

  if ( validaApellidos() && validaEdad() ) {

    resulta.textContent = ''; // Si hay algo en el div #resultado, lo borra
    resulta.appendChild( divInfo() );
    
    // this.submit(); // esto retomaría el curso del 'action' del formulario
    // submit() hace reset del form. pero no tengo back end donde enviar el form.
    this.reset(); // así que no uso submit, y borro el formulario manualmente
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
    form.apellidos.focus(); alert(error);  // TODO quitar esta linea cuando funcione setCustomValidity()
  }
  // form.apellidos.setCustomValidity(error); // TODO activar cuando funcione etCustomValidity()

  return valida;
}

function validaEdad() {
  let valida = true;
  let errorE = errorF = '';

  if (form.edad.value && form.edad.value < 16) {
    errorE = 'No tienes la edad requerida.';
    valida = false;
    form.edad.focus(); alert(errorE);      // TODO quitar esta linea cuando funcione setCustomValidity()
  } else if (form.fecha.value) {
    let annFe = form.fecha.value.substr(0,4); // Año de la fecha
    let hoy   = new Date();
    let annio = hoy.getFullYear(); // Año actual
    if (form.edad.value && form.fecha.value) {
      // ¿Coinciden edad y fecha de nacimiento?  
      if (form.edad.value != (annio - annFe)) {
        errorF = 'La fecha no coincide con la edad.';
        valida = false;
        form.fecha.focus(); alert(errorF); // TODO quitar esta linea cuando funcione setCustomValidity()
      }
    } else {
      // ¿Hace menos de 16 años desde que nació?
      if ((annio - annFe) < 16) { 
        errorF = 'No tienes la edad requerida.';
        valida = false;
        form.fecha.focus(); alert(errorF); // TODO quitar esta linea cuando funcione setCustomValidity()
      }
    }
  }
  // form.edad.setCustomValidity(errorE);  // TODO activar cuando funcione etCustomValidity()
  // form.fecha.setCustomValidity(errorF); // TODO activar cuando funcione etCustomValidity()

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