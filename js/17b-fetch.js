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

Si ya has obtenido toda la información, utiliza las herramientas del árbol DOM para
que esta información aparezca en la pantalla.
*/

const api = 'https://api.github.com/users/';
const form = document.formulario;
let spin  = intervalo = 0;

elUsuario = elemento('#user');
btnEnviar = elemento('#enviar');
elResulta = elemento('#resulta');
elZona    = elemento('#zona');

btnEnviar.onclick = evento => muestraInfo(evento);


/* Muestra información del usuario */
function muestraInfo(evento) {
    evento.preventDefault();
    btnInactivo(btnEnviar, true);
    ponSpin(true);

    let user = form.user.value.trim().toLowerCase();
    elUsuario.value = '';
    elResulta.innerHTML = '';

    if (user) {
        fetch(api + user)
        .then(resp => {
            // fetch no maneja errores de conexión, luego...
            if (!resp.ok) throw Error(resp.status);
            return resp;
        })
        .then(resp => resp.json())
        .then(data => {
            let avatar = data.avatar_url;
            let nombre = data.name;
            let numRep = data.public_repos;
            let enlace = data.html_url;

            console.log(avatar);
            console.log(nombre);
            console.log(numRep);

            if (nombre == null) nombre = '[Nombre no definido]';

            elResulta.innerHTML = `<img class="avatar" src="${avatar}" alt="${user}" />`;
            elResulta.innerHTML += `<h2><a href="${enlace}" target="_blank">${nombre}</a>`
                                + `<br />«${user}» | Repos:&nbsp;${numRep}</h2>`;
        })
        .catch(err => {
            elResulta.innerHTML = `<h2><span class="destaca">(!) ${err}</span><br />`
                                + `Usuario «${user}» no encontrado.</h2>`;
        })
    } else {
        console.log('¿usuario?');
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


