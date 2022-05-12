const enviar   = document.querySelector('#enviar');
const form     = document.formulario;

enviar.onclick = validaForm;

function validaForm() {
  if (validaEdad() && form.checkValidity()) {
    alert('Ambas validaciones son correctas.');
    form.submit();
  } else {
    alert( 'El formulario contiene errores.' );
  }
}

/* Comprueba que el usuario tenga más de 16 años */
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