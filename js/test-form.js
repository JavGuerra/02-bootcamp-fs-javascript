const enviar   = document.querySelector('#enviar');
const form     = document.formulario;

enviar.onclick = validaForm;

function validaForm() {
  if (validaEdad() && form.checkValidity()) {
    alert('Ambas validaciones son correctas.');
    // Cosas que hacer antes de enviar el form.
    // form.submit();
  } else {
    alert( 'El formulario contiene errores.' );
  }
}

/* El usuario debe tener al menos 16 años. */
function validaEdad() {
  let valida = true;
  let error  = '';
  if (form.edad.value < 16) {
      valida = false;
      error  = 'Demasiado joven.';
  }
  form.edad.setCustomValidity(error);
  return valida;
}