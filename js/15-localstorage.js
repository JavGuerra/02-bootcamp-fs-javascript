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


const enviar  = elemento('#enviar');
const borrLS  = elemento('#borrLS');
const borraF  = elemento('#borraF');
const datos   = elemento('#datos' );
const fecha   = elemento('#fecha' );
const form    = document.formulario;
let requerido = {nombre: false, edad: false, correo: false};

// Eventos de Crear
form.nombre.onchange = validaRequeridos;
form.edad.onchange   = validaRequeridos;
form.correo.onchange = validaRequeridos;
form.onsubmit = guardaLS;

// Eventos de Borrar
borrLS.onclick = borraLS;
borraF.onclick = borraFh;

// Inicio
poneEstado();


/* Devuelve un elemento */
function elemento(sel)  { return document.querySelector(sel); }

/* Muestra el listado de claves en L.S. o si no hay claves, muestra el formulario */
function poneEstado() {
    let hayDatos = (existeClave('datos') || existeClave('fecha')) ? true : false;

    // Schrödinger
    elemento('#formulario').style.display = !hayDatos ? 'initial' : 'none';
    elemento('#resultado').style.display  =  hayDatos ? 'initial' : 'none';

    if (!hayDatos) {
        enviar.disabled  = true;
        requerido.nombre = requerido.edad = requerido.correo = false;
        form.reset();
    } else {
        borrLS.disabled  = false;
        borraF.disabled  = false;
        recogeLS();
    }
}

/* ¿Se ha rellenado el formulario? */
function validaRequeridos() {
    requerido.nombre = form.nombre.value ? true : false; 
    requerido.edad   = form.edad.value   ? true : false; 
    requerido.correo = form.correo.value ? true : false;

    enviar.disabled  = !(requerido.nombre && requerido.edad && requerido.correo);
}

/* Guarda los datos en en L.S. */
function guardaLS(evento) {
    evento.preventDefault();

    requerido.nombre = form.nombre.value;
    requerido.edad   = form.edad.value;
    requerido.correo = form.correo.value;

    localStorage.datos = JSON.stringify(requerido);
    localStorage.fecha = new Date();

    poneEstado();
}

/* Lee y muestra los datos desde L.S. */
function recogeLS() {
    datos.textContent = existeClave('datos') ? localStorage.datos : 'no existe';
    fecha.textContent = existeClave('fecha') ? localStorage.fecha : 'no existe';

    if (existeClave('datos')) {
        datos.innerHTML += '<br /><span class="propiedad">Propiedades del objeto «datos»:</span>';
        requerido = JSON.parse(localStorage.datos);
        for (const propiedad in requerido) {
            datos.innerHTML += `<br /><span class="etiqueta">${propiedad}:</span> `;
            datos.innerHTML += `<span class="propiedad">${requerido[propiedad]}</span>`;
        }
    }
}

/* Borra todas las claves de L.S. */
function borraLS() {
    borrLS.disabled = true;
    if (localStorage.length) localStorage.clear();
    poneEstado();
}

/* Borra la fecha de alta de L.S. */
function borraFh() {
    borraF.disabled = true;
    if (existeClave('fecha')) localStorage.removeItem('fecha');
    fecha.textContent = 'no existe';
}

/* ¿Existe la clave en L.S.? Devuelve un booleano */
function existeClave(clave) {
    return localStorage.getItem(clave) !== undefined && localStorage.getItem(clave);
}