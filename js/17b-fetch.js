/*
¿Quieres saber mi información? Aquí la tienes.

Para este ejercicio vamos a utilizar la API de usuarios de GitHub, la cual tiene
esta URL: https://api.github.com/users/{username}. {username} es el nombre del
usuario en GitHub, por lo que si quieres buscar a cualquier usuario, solo tienes
que ponerlo en la url. Por ejemplo, https://api.github.com/users/silvialcastilla.
Si ponéis esta URL en una nueva pestaña del navegador podréis observar qué datos
nos devuelve el API.

Lo primero que haremos será crear un input de tipo texto y un botón para buscar.
El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar.
Después crearemos una función que se ejecute cuando se pulse el botón buscar y que
contenga una petición a la API para obtener información de ese usuario y así
mostrarla en nuestra página:

Lo que queremos que se imprima por consola será:

    nombre
    número de repositorios
    avatar (imagen)

Si ya has obtenido toda la información, utiliza las herramientas del arbol DOM para
que esta información aparezca en la pantalla.
*/

const api = 'https://api.github.com/users/';
const form = document.formulario;
let spin  = intervalo = 0;

btnUser   = elemento('#usuario');
btnEnviar = elemento('#enviar');
elResulta = elemento('#resulta');
elZona    = elemento('#zona');

btnEnviar.onclick = evento => muestraInfo(evento);


/* Consulta la API en la ruta dada y ejecuta la función hacer() */
function consultaAPI(ruta, hacer, error) {
    fetch(ruta)
    .then(resp => resp.json())
    .then(data => hacer(data))
    .catch(err => error(err))
}


/* Muestra información del usuario */
function muestraInfo(evento) {
    evento.preventDefault();
    btnInactivo(btnEnviar, true);

    let user = form.user.value.trim().toLowerCase();
    elResulta.innerHTML = '';

    if (user) {
        let hacer = data => {
            ponSpin(true);
        
            let avatar = data.avatar_url;
            let nombre = data.name;
            let numRep = data.public_repos;

            console.log(avatar);
            console.log(nombre);
            console.log(numRep);

            elResulta.innerHTML = `<img src="${avatar}" alt="${nombre}" />`;
            elResulta.innerHTML += `<h2>${nombre} | Repos: ${numRep}`; 
        
            ponSpin(false);  
        }

        let error = err => {
            alert(err);
        }

        consultaAPI(api + user, hacer, error);
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


/* Activa o desactiva el spin */
function ponSpin(estado) {
    estado ? spin++ : spin--;

    if (estado && !intervalo) {
        intervalo = setInterval(compruebaSpin, 300);
        elZona.style.display = 'initial';
    }
}


/* Comprueba si el spin ha llegado a cero y desactiva comprobación */
function compruebaSpin() {
    if (!spin) {
        clearInterval(intervalo);
        intervalo = 0;
        elZona.style.display = 'none'; 
    }
}


