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
let nFotos  = 25;
let pagina  = 1;
let razas   = [];
let galeria = [];
let hacer;

elPerrito = elemento('#perrito');
elCampo   = elemento('#raza'   );
elRazas   = elemento('#razas'  );
btnEnviar = elemento('#enviar' );
btnAcepta = elemento('#aceptar');
elGaleria = elemento('#galeria');
elPaginac = elemento('#pagina' );
btnIrInic = elemento('#irInic' );
btnAnteri = elemento('#anteri' );
btnSiguie = elemento('#siguie' );
btnIrFin  = elemento('#irFin'  );
elDialogo = elemento('#error'  );
elMsgErr  = elemento('#msgErr' );
elZona    = elemento('#zona'   );

btnAcepta.onclick = cierraVentanaModal;
btnEnviar.onclick = evento => muestraGaleria(evento);
btnIrInic.onclick = inicial;
btnAnteri.onclick = anterior;
btnSiguie.onclick = siguiente;
btnIrFin.onclick  = final;
botonera(false);
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
    elPaginac.textContent = '';
    botonera(false);
    galeria = [];
    pagina  = 1;

    let raza = form.raza.value.trim().toLowerCase();
    elCampo.value = raza;

    if(raza) {
        if (razas.indexOf(raza) != -1) {

            let hacer = data => {
                data.message.forEach(urlFoto => {galeria.push(urlFoto)})
                paginacion(galeria, pagina, nFotos);
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


/* Pagina los elementos de un vector en función de página y elementos por página */
function paginacion(vector, pagina, elementos) {
    let longitud, numPags, inicio;
    longitud = vector.length;
    if (longitud) {
        // Averigua el elemento de inicio
        numPags = Math.ceil(longitud / elementos);
        if (pagina > numPags) pagina = numPags;
        if (pagina < 1) pagina = 1;
        inicio = (pagina - 1) * elementos;
        // Ajusta el número de elementos si se requiere
        if (longitud < elementos) {
            elementos = longitud;
        } else if (longitud - inicio < elementos) {
            elementos = longitud - inicio;
        }
        // Resuelve
        ctrlBotonesPag(pagina, numPags);
        listaElementos(vector, inicio, elementos); 
    }
}


/* Activa o desactiva los botones según la página */
function ctrlBotonesPag(pagina, numPags) {
    btnInactivo(btnIrInic, false);
    btnInactivo(btnAnteri, false);
    btnInactivo(btnSiguie, false);
    btnInactivo(btnIrFin,  false);
    if (pagina == 1) {
        btnInactivo(btnIrInic, true);
        btnInactivo(btnAnteri, true);
    }
    if (pagina == numPags) {
        btnInactivo(btnSiguie, true);
        btnInactivo(btnIrFin,  true);
    }
}


/* Va a la primera página */
function inicial() {
    pagina = 1;
    paginacion(galeria, pagina, nFotos);
}


/* Va a la página anterior */
function anterior() {
    pagina--;
    paginacion(galeria, pagina, nFotos);
}


/* Va a la página siguiente */
function siguiente() {
    pagina++;
    paginacion(galeria, pagina, nFotos);
}


/* Va a la última página */
function final() {
    longitud = galeria.length;
    pagina = Math.ceil(longitud / nFotos);
    paginacion(galeria, pagina, nFotos);
}


/* Activa o desactiva la botonera */
function botonera(status) {
    btnIrInic.style.display = status ? 'initial' : 'none';
    btnAnteri.style.display = status ? 'initial' : 'none';
    btnSiguie.style.display = status ? 'initial' : 'none';
    btnIrFin.style.display  = status ? 'initial' : 'none';
}


/* Muestra la cantidad de elementos de un vector desde la posición dada */
function listaElementos(vector, inicio, elementos) {
    let longitud = vector.length;
    let primero  = inicio + 1;
    let fin = inicio + elementos;
    elGaleria.textContent = '';
    elPaginac.textContent = '';
    botonera(false);
    vector.slice(inicio, fin).forEach(
        (urlFoto, i) => {
            medidas(urlFoto) // Para evitar el Flash Of Unestiled Content (FOUC)
            .then(mide => {
                elGaleria.innerHTML += `<div><a href="${urlFoto}" target="_blank"><img ` 
                + `class="foto" src="${urlFoto}" width="${mide.ancho}" height="${mide.alto}"`
                + `alt="Foto ${primero + i}" title="Foto ${primero + i}" /></a></div>`
            })
            .catch(err => {
                console.error(err);
                abreVentanaModal(err);
            });
        }
    )
    elPaginac.innerHTML = `Fotos: ${primero} a ${fin} de ${longitud}`;
    botonera(true);
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
