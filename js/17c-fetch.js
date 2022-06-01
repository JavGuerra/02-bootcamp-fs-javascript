/*
Promesas, promesas y más promesas
=================================

Dada una lista de usuarios de github guardada en una array, utiliza
'https://api.github.com/users/${name}' para obtener el nombre de cada usuario.

- Objetivo: Usar Promise.all()
- Recordatorio: Una llamada a fetch() devuelve un objeto promesa.
- Pregunta. ¿cuántas promesas tendremos?

Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

Pasos:

- Mapear el array y hacer un fetch() para cada usuario. Esto nos devuelve un array lleno de promesas.
- Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
- Cuando Promise.all() haya terminado:
    - Consigue que se imprima por consola la url del repositorio de cada usuario.
    - Consigue que se imprima por consola el nombre de cada usuario.
*/


const url = 'https://api.github.com/users/';
const listaUsuarios = ['jgthms', 'mauricesvay', 'xet7', 'javguerra'];
let   listaPromesas = listaUsuarios.map(usuario => fetch(url + usuario));

console.log('\nResultado:');
console.log(`Hay ${listaPromesas.length} promesas.\n\n`);

Promise.all(listaPromesas)
    .then(listaRespuestas => {
        listaRespuestas.forEach(respuesta => {
            comprueba(respuesta) // alt: Promise.resolve(respuesta.json())
                .then(data => {
                    console.log('Nombre: ' + data.name );
                    console.log('URL: ' + data.html_url);
                    console.log('\n');
                })
                .catch(err => {console.error(err)});       
        })
    })
    .catch(err => {console.error(err)})

/* Devuelve una promesa */
function comprueba(respuesta) {
    return new Promise ((resolve, reject) => {
        if (respuesta.ok) resolve (respuesta.json());
        else reject (`Error ${respuesta.status}: ${respuesta.url} ${respuesta.statusText}`);
    })
}