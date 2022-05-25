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

let hacer;
let  raza = 'dachshund';
const url = 'https://dog.ceo/api/';
const all = 'breeds/list/all';
const rnd = 'breeds/image/random';
const gal = 'breed/' + raza + '/images';
const form = document.formulario;

elPerrio  = elemento('#perrito');
elLista   = elemento('#lista');
elRazas   = elemento('#razas');
btnEnviar = elemento('#enviar');
elGaleria = elemento('#galeria');

btnEnviar.onclick = evento => muestraGaleria(evento);

/* Consulta la API en la ruta dada y ejecuta la función hacer() */
async function consultaAPI(ruta, hacer) {
    fetch(ruta)
    .then(resp => resp.json())
    .then(data => hacer(data))
    .catch(err => console.error(err))
}


/* Obtiene la lista de razas de la API */
hacer = data => {
    for(raza in data.message) {
        console.log(raza);
        elRazas.innerHTML += `<option value="${raza}" />`;
    }
};
consultaAPI(url + all, hacer);


/* Obtiene una imagen al azar de la API */
hacer = data => {
    let foto;
    foto = data.message;
    console.log(foto);
    elPerrio.setAttribute('src', foto);
};
consultaAPI(url + rnd, hacer);


/* Obtiene las imágenes de una raza concreta de la API */
hacer = data => {data.message.forEach(foto => {console.log(foto);})};
consultaAPI(url + gal, hacer);


/* Muestra la galería de las imágenes de una raza concreta
 obtenidas de la API que hemos seleccionado en el campo 'lista' */
function muestraGaleria(evento) {
    evento.preventDefault();
    elGaleria.textContent = '';

    if(form.lista.value.trim()) {
        hacer = data => {
            let galeria = [];
            data.message.forEach(foto => {galeria.push(foto)})

            galeria.slice(0, galeria.length > 25 ? 25 : galeria.length)
            .forEach(foto => {elGaleria.innerHTML +=
                `<img class="foto" src="${foto}" alt="Foto de perrito" title="${foto}" />`}
            );
        };
        let gal = 'breed/' + form.lista.value + '/images';
        consultaAPI(url + gal, hacer);
    } else {
        console.log('Nada que mostrar');
    }
}


/* Devuelve un elemento */
function elemento(sel) { return document.querySelector(sel); }


/* Crea y un elemento y lo devuelve */
function creaElem(el)  { return document.createElement(el);  }