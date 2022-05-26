/*
EJERCICIO

Quiero un perrito, pero no se qué raza escoger, ¿me ayudas?

En este ejercicio utilizaremos la API de https://dog.ceo/dog-api/.

Leyendo su documentación, deberás hacer lo siguiente:
- Imprimir por consola la lista de razas de todos los perros.
- Imprimir por consola una imagen random de una raza.
- Imprimir por consola todas las imágenes de una raza concreta.

¿Y si ahora te pidiéramos que podamos poner otra raza en la url para que nos
busque otras imágenes? Adapta las urls que ya tenías para que puedas pasarle
argumentos.

Recuerda que para estos ejercicios deberás utilizar fetch.

Al haber conseguido que se imprima por consola, el siguiente paso será que se
muestren en pantalla con las herramientas que nos ofrece el árbol DOM.

Nota: Utilizar slice para limitar el número de fotos a 10.

Referencias:
https://lemoncode.net/lemoncode-blog/2018/1/29/javascript-asincrono
https://www.neoguias.com/javascript-asincrono/
https://lenguajejs.com/javascript/asincronia/que-es/
*/


// Nota: el número de fotos por listado está limitado a 25.

const url = 'https://dog.ceo/api/';
const all = 'breeds/list/all';
const rnd = 'breeds/image/random';
const gal = 'breed/dachshund/images';
const form = document.formulario;
let razas = [];
let hacer;

elZona    = elemento('#zona');
elPerrito = elemento('#perrito');
elLista   = elemento('#lista');
elRazas   = elemento('#razas');
btnEnviar = elemento('#enviar');
elGaleria = elemento('#galeria');

btnEnviar.onclick = evento => muestraGaleria(evento);
btnInactivo(btnEnviar, true);


/* Consulta la API en la ruta dada y ejecuta la función hacer() */
async function consultaAPI(ruta, hacer) {
    fetch(ruta)
    .then(resp => resp.json())
    .then(data => hacer(data))
    .catch(err => console.error(err))
}


/* Obtiene la lista de razas de la API */
hacer = data => {
    ponSpin(true);

    for(raza in data.message) {
        razas.push(raza);
        console.log(raza);
        elRazas.innerHTML += `<option value="${raza}" />`;
    }
    // El botón sólo se activa cuando razas está completa
    // impidiendo realizar búsquedas hasta entonces.
    btnInactivo(btnEnviar, false);

    ponSpin(false);
};
consultaAPI(url + all, hacer);


/* Obtiene una imagen al azar de la API */
hacer = data => {
    ponSpin(true);

    let foto = data.message;
    console.log(foto);
    elPerrito.setAttribute('src', foto);

    ponSpin(false);
};
consultaAPI(url + rnd, hacer);


/* Obtiene las imágenes de una raza concreta de la API */
hacer = data => {
    ponSpin(true);

    data.message.forEach(foto => {console.log(foto)});

    ponSpin(false);
};
consultaAPI(url + gal, hacer);


/* Muestra la galería de las imágenes de una raza concreta
 obtenidas de la API que hemos seleccionado en el campo 'lista' */
function muestraGaleria(evento) {
    evento.preventDefault();
    btnInactivo(btnEnviar, true);
    ponSpin(true);

    elGaleria.textContent = '';
    let raza = form.lista.value.trim();

    if(raza) {
        if (razas.indexOf(raza) != -1) {

            hacer = data => {
                let galeria = [];
                data.message.forEach(foto => {galeria.push(foto)})

                galeria.slice(0, galeria.length > 25 ? 25 : galeria.length).forEach(
                    (foto, i) => {elGaleria.innerHTML += `<div><a href="${foto}" target="_blank">` 
                    + `<img class="foto" src="${foto}" alt="Foto de perrito ${i+1}" title="${foto}" />`
                    + '</a></div>'}
                );
            };
            let gal = 'breed/' + raza + '/images';
            consultaAPI(url + gal, hacer);
            
        } else {
            console.log(`No hay información de la raza: "${raza}"`);
            alert(`No hay información de la raza: "${raza}"`);
        }
    } else {
        console.log('Nada que mostrar');
    }
    
    ponSpin(false);
    btnInactivo(btnEnviar, false);
}


/* Devuelve un elemento */
function elemento(sel) { return document.querySelector(sel); }


/* Cambia el estado de un botón dado */
function btnInactivo(boton, estado) {
    boton.disabled = estado;
    boton.setAttribute('aria-disabled', estado);
}

/* Activa o desactiva el spin */
function ponSpin(estado) {
    elZona.style.display = estado ? 'initial' : 'none';
}