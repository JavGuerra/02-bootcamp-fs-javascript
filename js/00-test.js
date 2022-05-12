/* -- TESTS -- */

const enviar   = document.querySelector('#enviar');
const nombre   = document.querySelector('#nombre');
const form     = document.formulario;

enviar.onclick = validaForm;

function validaForm() {
  if (validaNombre() && form.checkValidity()) {
    alert('Ola ke Ase');
    // form.submit();
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