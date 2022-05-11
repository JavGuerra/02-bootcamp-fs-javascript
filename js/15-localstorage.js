/*
Ejercicio Local Storage

Crear un formulario de contacto con los siguientes campos: Nombre, email, edad.

Guardar en Local Storage los datos de contacto enviados del usuario.

Tendremos que tener por lo menos dos datos en el local storage, un objeto con
los datos del usuario y otro dato a parte como puede ser la fecha de alta.

Establecer control para que el formulario solo salga si NO existen datos en el
local storage. De la misma manera, la section donde volcaremos los datos solo
saldrá si existen datos.

En la section de los datos del usuario, añadiremos dos botones (uno que borre
todo el contenido del local storage y otro que solo borre la fecha).

Usa JSON.parse() y JSON.stringify() para guardar muchos datos usando la misma clave.

+ info: https://github.com/TheBridge-FullStackDeveloper/fullstack_INDRA_PT_mar22/blob/main/teoria/fundamentos-javascript/clase4.md
*/


let fechaAlta;
let datosForm;