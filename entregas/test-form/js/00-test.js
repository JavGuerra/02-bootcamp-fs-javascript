/* -- TESTS -- */

const enviar   = document.querySelector('#enviar');
const nombre   = document.querySelector('#nombre');
const form     = document.formulario;

//form.onsubmit   = prevenirEvento;
enviar.onclick = validaForm;

function prevenirEvento(evento) { evento.preventDefault(); }

function validaForm() {
  if (validaNombre()) {
    form.onsubmit();
    alert('Ola ke Ase');
  }
}

/* Dos nombres separados por un espacio */
function validaNombre() {
  let valida = true;
  let error = '';
  if (!form.nombre.value.trim().includes(' ')) {
    error  = 'Debes incluir todos los nombres.';
    valida = false;
  }
  form.nombre.setCustomValidity(error);

  return valida;
}