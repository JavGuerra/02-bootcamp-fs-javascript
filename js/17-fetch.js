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

https://rosolutions.com.mx/blog/index.php/2018/10/29/manejo-de-errores-al-utilizar-fetch/
*/


// Nota: el número de fotos por listado está limitado a 25.

const url = 'https://dog.ceo/api/';
const all = 'breeds/list/all';
const rnd = 'breeds/image/random';
const gal = 'breed/dachshund/images';
const form = document.formulario;
let spin  =  intervalo = 0;
let mensaje = '';
let nFotos = 25;
let pagina = 1;
let razas  = [];
let hacer;

elPerrito = elemento('#perrito');
elCampo   = elemento('#raza');
elRazas   = elemento('#razas');
btnEnviar = elemento('#enviar');
btnAcepta = elemento('#aceptar');
elGaleria = elemento('#galeria');
elNavegac = elemento('#navegacion');
elDialogo = elemento('#error');
elMsgErr  = elemento('#msgErr');
elZona    = elemento('#zona');

btnAcepta.onclick = cierraVentanaModal;
btnEnviar.onclick = evento => muestraGaleria(evento);
btnInactivo(btnEnviar, true);
elCampo.value = '';


/* Consulta la API en la ruta dada y ejecuta la función callback() */
function consultaAPI(ruta, callback) {
    ponSpin(true);
    fetch(ruta)
        .then(respuesta => { // fetch() no maneja errores de conexión, luego...
            if (!respuesta.ok) throw Error(respuesta.statusText);
            return respuesta.json();
        })
        .then(data => callback(data))
        .catch(err => {
            console.error(err);
            abreVentanaModal(err);
        })
        .finally(ponSpin(false));
}


/* Obtiene la lista de razas de la API */
hacer = data => {
    for(raza in data.message) {
        razas.push(raza);
        console.log(raza);
        elRazas.innerHTML += `<option value="${raza}" />`;
    }
    // btnEnviar se activa sólo cuando 'razas' está completa.
    btnInactivo(btnEnviar, false);
};
consultaAPI(url + all, hacer);


/* Obtiene de la API una imagen al azar con sus medidas */
hacer = data => {
    let urlFoto = data.message;
    console.log(urlFoto);
    medidas(urlFoto)
    .then(mide => { 
        elPerrito.setAttribute('width', mide.ancho);
        elPerrito.setAttribute('height', mide.alto);
        elPerrito.setAttribute('src', urlFoto);
    })
    .catch(err => {
        console.error(err);
        abreVentanaModal(err);
    });
};
consultaAPI(url + rnd, hacer);


/* Obtiene las url de las imágenes de una raza concreta de la API */
hacer = data => { data.message.forEach(urlFoto => {console.log(urlFoto)}) };
consultaAPI(url + gal, hacer);


/* obtiene de la API y muestra la galería de imágenes de una
   raza concreta que hemos seleccionado en el campo 'raza' */
function muestraGaleria(evento) {
    evento.preventDefault();
    btnInactivo(btnEnviar, true);

    elGaleria.textContent = '';
    elNavegac.textContent = '';
    pagina = 1;

    let raza = form.raza.value.trim().toLowerCase();
    elCampo.value = raza;

    if(raza) {
        if (razas.indexOf(raza) != -1) {

            let hacer = data => {
                let galeria = [];
                data.message.forEach(urlFoto => {galeria.push(urlFoto)})
                paginacion(galeria, nFotos);
            };
            let gal = 'breed/' + raza + '/images';
            consultaAPI(url + gal, hacer);
            
        } else {
            mensaje = `No hay información de la raza: «${raza}».`;
            console.log(mensaje);
            abreVentanaModal(mensaje);
        }
    } else {
        console.log('Nada que mostrar');
    }
    
    btnInactivo(btnEnviar, false);
}


/* Devuelve un elemento */
function elemento(sel) { return document.querySelector(sel); }


/* Cambia el estado de un botón dado */
function btnInactivo(boton, estado) {
    boton.disabled = estado;
    boton.setAttribute('aria-disabled', estado);
}


/* Abre la ventana modal con un mensaje */
function abreVentanaModal(mensaje) {
    elMsgErr.textContent = mensaje;
    elDialogo.showModal();
}


/* Cierra ventana de mensaje modal */
function cierraVentanaModal() { elDialogo.close() };


/* Activa o desactiva el spin */
function ponSpin(estado) {
    estado ? spin++ : spin--;

    if (estado && !intervalo) {
        intervalo = setInterval(compruebaSpin, 300);
        elZona.showModal();
    }
}


/* Comprueba si el spin ha llegado a cero y desactiva comprobación */
function compruebaSpin() {
    if (!spin) {
        clearInterval(intervalo);
        intervalo = 0;
        elZona.close(); 
    }
}


/* Pagina los elementos de un vector  en función del número de elementos dado */
function paginacion(vector, numEl) {
    let elemens, inicio, info;
    let totElem = vector.length;
 
    if (totElem > numEl) {
        elemens = numEl;
        // TODO botones anterior - siguiente
    } else {
        elemens = totElem;
        // TODO Controlar la última página, que puede tener menos numEl
    }

    inicio = (pagina - 1) * elemens;

    // Mostrando la galería
    vector.slice(inicio, elemens).forEach(
        (urlFoto, i) => {
            medidas(urlFoto)
            .then(mide => { // Para evitar el Flash Of Unestiled Content (FOUC)
                elGaleria.innerHTML += `<div><a href="${urlFoto}" target="_blank"><img ` 
                + `class="foto" src="${urlFoto}" width="${mide.ancho}" height="${mide.alto}"`
                + `alt="Foto ${inicio + i + 1}" title="Foto ${inicio + i + 1}" /></a></div>`
            })
            .catch(err => {
                console.error(err);
                abreVentanaModal(err);
            });
        }
    )
    info = `<span class="cuenta">Fotos: ${inicio + 1} a ${elemens} de ${totElem}</span>`;
    elNavegac.innerHTML = info;
}


/* Obtiene el ancho y alto de una imagen. Resuelve con un objeto */
function medidas(urlFoto) {
    return new Promise((resolve, reject) => {
        try {
            ponSpin(true);
            const img = new Image();
            img.onload  = () => {
                resolve({ ancho: img.width, alto: img.height });
            };
            img.onerror = () => {
                // ¿TODO?  throw Error('Imagen no encontrada.')
                reject(new Error('Imagen no encontrada.'));
            };
            img.src = urlFoto;
        }
        catch (err) { reject(err) }
        finally  { ponSpin(false) }
    });
}