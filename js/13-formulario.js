/*
Cogemos el ejercicio del formulario de cuando dimos html. Cuando le des al
botón de enviar formulario capturas el evento y se validan los campos del
formulario. Si los datos están todos bien, presentar los datos. El ejemplo que
puso fue una ficha personal, pero dijo que podía hacerse de la forma que se
quiera. Una vez este la funcionalidad esa hecha, si da tiempo, aplicar Flexbox
al formulario para dejarlo medio bonito y sin los br tan feos que usamos en su día.
*/

const resulta = elemento('#resultado');
const form    = document.formulario; // document.getElementsByName()[0];
form.onsubmit = validaForm; // form.addEventListener('submit', validar);

function validaForm(evento) {

    evento.preventDefault(); // Evita que el evento siga su curso

    console.log('-- Campos obligatorios --') // Test
    console.log('Nombre   : ' + form.nombre.value   );
    console.log('Apellidos: ' + form.apellidos.value);
    console.log('Correo   : ' + form.correo.value   );

    resulta.textContent = ''; // Si hay algo en el div #resultado, lo borra

    resulta.appendChild(divInfo());

    // Si no hay errores...
    this.reset();  // Está implícito en submit() pero submit está desactivado
    // this.submit(); // Sigue el curso del action del formulario
}

/* Devuelve un div con la info del formulario */
function divInfo() {
    let div = creaElem('div');

    div.innerHTML =  "<p>Nombre y apellidos: " + form.nombre.value
                     + ' ' + form.apellidos.value;
    div.innerHTML += "<p>Correo: " + form.correo.value;

    return div;
}

function elemento(sel) { return document.querySelector(sel); }

function creaElem(el)  { return document.createElement(el);  }



form.nombre.onkeypress = checkName;
function checkName(e) {
  var charCode = e.charCode;

  if (charCode != 0) {
    if (charCode < 97 || charCode > 122) {
      e.preventDefault();
      alert("Por favor usa sólo letras minúsculas." + "\n"
            + "charCode: " + charCode + "\n"
      );
    }
  }
}


// document.getElementById('borrar').addEventListener('click', borrar);

// function borrar () {
//    document.getElementById('resultado').remove();
// }


// document.formulario.submit() // con name formulario

// if (document.formulario.nombre.value.length==0){
//    alert("Tiene que escribir su nombre")
//    document.formulario.nombre.focus()
//    return 0;
// }


// onclick vs addEventListener
// https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick