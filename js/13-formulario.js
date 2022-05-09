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
    let div = creaElem('div');
    div.setAttribute("id", "info");
    div.innerHTML = '<h2>Datos recibidos desde el formulario</h2>';
    div.innerHTML +=  '<p><span class="etiqueta">Nombre y apellidos:</span> ' + form.nombre.value
                     + ' ' + form.apellidos.value;
    div.innerHTML += '<p><span class="etiqueta">Correo:</span> ' + form.correo.value;
    return div;
}

function validaApellidos(e) {
  let value = form.apellidos.value;
  if (!value.trim().includes(' ')) {
    alert('Debe incluir todos los apellidos');
    let el = elemento('#apellidos');
    el.focus(); // TODO
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
      alert("Por favor usa sólo vocales y consonantes." + "\n"
          + "Carácter: '" + String.fromCharCode(charCode) + "', charCode: " + charCode + "\n"
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
      alert("Por favor usa sólo números, espacios, paréntesis, '+'." + "\n"
          + "Carácter: '" + String.fromCharCode(charCode) + "', charCode: " + charCode + "\n"
      );
    }
  }
}