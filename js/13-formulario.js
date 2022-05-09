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
const form    = document.formulario; // document.getElementsByName()[0];

form.nombre.onkeypress    = validaChars;
form.apellidos.onkeypress = validaChars;
form.apellidos.onblur     = validaApellidos;
form.deporte.onkeypress   = validaChars;
form.telefono.onkeypress  = validaCharTel;
form.onsubmit             = validaForm; // form.addEventListener('submit', validar);

function elemento(sel) { return document.querySelector(sel); }

function creaElem(el)  { return document.createElement(el);  }

function validaForm(evento) {
    evento.preventDefault(); // Evita que el evento siga su curso

    console.log('-- Campos obligatorios --')   // Test
    console.log('Nombre   : ' + form.nombre.value   );
    console.log('Apellidos: ' + form.apellidos.value);
    console.log('Correo   : ' + form.correo.value   );

    // Si no hay errores...
    resulta.textContent = ''; // Si hay algo en el div #resultado, lo borra
    resulta.appendChild(divInfo());
    this.reset();  // Está implícito en submit() pero submit está desactivado
    // this.submit(); // Sigue el curso del action del formulario
}

/* Devuelve un div con la info del formulario */
function divInfo() {
    let divInfo, div;

    divInfo = creaElem('div');
    divInfo.setAttribute("id", "info");
    divInfo.innerHTML =  '<h2>Datos recibidos desde el formulario</h2>';

    div = creaElem('div');
    div.classList.add('valores');

    // Nombre y apellidos
    div.innerHTML += '<div class="valor"><span class="etiqueta">Nombre completo:</span> '
                   + form.nombre.value + ' ' + form.apellidos.value + '</div>';
    // Edad
    if (form.edad.value) {
      div.innerHTML += '<div class="valor"><span class="etiqueta">Edad:</span> '
      + form.edad.value  + '</div>';           
    }
    // Sexo
    if (form.sexo.value) {
      div.innerHTML += '<div class="valor"><span class="etiqueta">Sexo:</span> '
      + form.sexo.value  + '</div>';           
    }
    // Fecha de nacimiento
    if (form.fecha.value) {
      div.innerHTML += '<div class="valor"><span class="etiqueta">Nacimiento:</span> '
      + form.fecha.value  + '</div>';
    }
    // Deporte favorito
    if (form.deporte.value) {
    div.innerHTML += '<div class="valor"><span class="etiqueta">Deporte favorito:</span> '
    + form.deporte.value  + '</div>';
    }
    // Color favorito
    if (form.color.value) {
      div.innerHTML += '<div class="valor"><span class="etiqueta">Color favorito:</span> '
      + form.color.value + '</div>';
    }
    // Teléfono
    if (form.telefono.value) {
      div.innerHTML += '<div class="valor"><span class="etiqueta">Teléfono:</span> '
      + form.telefono.value + '</div>';
    }
    // Correo electrónico
    div.innerHTML += '<div class="valor"><span class="etiqueta">Correo:</span> '
    + form.correo.value + '</div>';
    // Ciudad de nacimiento
    if (form.ciudad.value) {
      div.innerHTML += '<div class="valor"><span class="etiqueta">Ciudad:</span> '
      + form.ciudad.value + '</div>';
    }
    // Alguna curiosidad
    if (form.curiosidad.value) {
      div.innerHTML += '<div class=""><span class="etiqueta">Alguna curiosidad:</span> '
      + form.curiosidad.value + '</div>';
    }

    divInfo.appendChild(div);

    return divInfo;
}

function validaApellidos(e) {
  if (!form.apellidos.value.trim().includes(' ')) {
    e.preventDefault();
    form.apellidos.focus(); // TODO Aún no pone el foco en apellidos
    alert('Debes incluir todos los apellidos');
  }
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
        !(charCode == 222) && !(charCode == 32) ) {
      e.preventDefault();
      alert("Usa sólo vocales y consonantes." + "\n"
          + "Carácter recibido: '" + String.fromCharCode(charCode) + "', charCode: " + charCode + ".\n"
      );
    }
  }
}

function validaCharTel(e) {
  let charCode = e.charCode;
  if (charCode != 0) {
    if (!(charCode >= 48  &&  charCode <= 57 ) &&
        !(charCode >= 40  &&  charCode <= 41 ) &&
        !(charCode == 32) && !(charCode == 43) ) {
      e.preventDefault();
      alert("Usa sólo números, espacios, paréntesis y '+'." + "\n"
          + "Carácter recibido: '" + String.fromCharCode(charCode) + "', charCode: " + charCode + ".\n"
      );
    }
  }
}