/*
Enunciado:

Diseñaremos un HTML que represente un cronómetro con el formato que queramos,
por ejemplo: 00:00.
Añadiremos los botones:
- Iniciar: Activará el cronómetro, incrementando el contador cada 1 segundo.
- Parar: Detiene el cronómetro.
- Continuar: Vuelve a activar el cronómetro.
- Contar hasta 10: Iniciará el cronómetro y lo parará a los 10 segundos (y para el crono).
- Guardar: Guarda el estado del crono en el momento que es pulsado (sin parar el crono).
- Ver tiempos: Mostrará el listado de tiempos divido en sesiones que guarda el Local Storage.

Queremos guardar en el Local Storage un conjunto de listado de tiempos divididos por sesiones,
si es la primera vez que accede el usuario a la página web, la sesión será la número 1
y así sucesivamente.

Añadiremos los botones pertinentes para borrar todos los datos del Local Storage o solo los datos
de una sesión en concreto. (si sobra tiempo) (editado)

https://www.w3schools.com/jsref/met_win_settimeout.asp
https://www.w3schools.com/jsref/met_win_setinterval.asp
*/

// Nota: La aplicación maneja sólo minutos y segundos.

let cronometro, parada10s;
let sesion = [];
let numSesion = numClave();
let contador = 0;

const inicia = elemento('#inicia');
const contin = elemento('#contin');
const parate = elemento('#parate');
const cuenta = elemento('#cuenta');
const guarda = elemento('#guarda');
const histor = elemento('#histor');
const borrar = elemento('#borrar');
const resulta = elemento('#resulta');
const listado = elemento('#listado');

inicia.onclick = iniciaCrono;
contin.onclick = continCrono;
parate.onclick = parateCrono;
cuenta.onclick = cuentaCrono;
guarda.onclick = guardaLocal;
histor.onclick = historLocal;
borrar.onclick = borrarLocal;

/* Botones al inicio */
parate.disabled = true;
contin.disabled = true;
guarda.disabled = true;
if (localStorage.length) {
    historLocal();
} else {
    histor.disabled = true;
    borrar.disabled = true;
}


/* Inicia el cronómetro */
function iniciaCrono() {
    parateCrono();
    botonsCrono(inicia);
    contador = -1; // Porque sumaCromo() le suma 1.
    sumaCrono();
    continCrono();
}

/* Para el cronómetro o el contador */
function parateCrono() {
    botonsCrono(parate);
    if (cronometro) {
        clearInterval(cronometro);
        cronometro = null;
    }
    if (parada10s ) {
        clearInterval(parada10s );
        parada10s  = null;
        contin.disabled = true;
    } 
    if (!contador) guarda.disabled = true;
}

/* Continua el cronómetro tras la pausa */
function continCrono() {
    parateCrono();
    botonsCrono(contin);
    cronometro = setInterval(sumaCrono, 1000);
}

/* Inicia la cuenta hasta 10 */
function cuentaCrono() {
    parateCrono();
    botonsCuenta();
    contador = 11; // Porque restaCuenta() le resta 1.
    restaCuenta();
    cronometro = setInterval(restaCuenta, 1000);
    parada10s  = setTimeout( parateCrono, limite());
}

/* Contador según navegador */
function limite() {
    return navigator.userAgent.indexOf("Firefox") > -1 ? 11000 : 10000;
}

/* Suma y muestra minutos y segundos */
function sumaCrono() {
    let minutos, segundos, formato;
    contador++;
    if (contador >= 60) {
        minutos  = digitos(Math.trunc(contador / 60));
        segundos = digitos(contador % 60);
    } else {
        minutos  = 0;
        segundos = digitos(contador);
    }
    formato = `<span class="tiempo">${segundos}</span>` 
            + '<span class="medida"> s</span>';
    if (minutos) {
            formato = `<span class="tiempo">${minutos}</span>`
            + '<span class="medida"> min</span>'
            + '<span class="separa"> :</span>' + formato;
    }
    resulta.innerHTML = formato;
}

/* Resta y muestra el contador */
function restaCuenta() {
    contador--;
    formato = `<span class="tiempo">${digitos(contador)}</span>`
            + '<span class="medida"> s</span>';   
    resulta.innerHTML = formato;
}

/* Devuelve dos dígitos */
function digitos(numero) {
    return numero < 10 ? '0' + numero : numero ;
}

/* Activa y desactiva botones según Crono */
function botonsCrono(boton) {
    inicia.disabled = false;
    contin.disabled = false;
    parate.disabled = false;
    cuenta.disabled = false;
    guarda.disabled = false;
    boton.disabled  = true;
}

/* Activa y desactiva botones según Cuenta */
function botonsCuenta() {
    parate.disabled = false;
    guarda.disabled = false;
    contin.disabled = true;
    cuenta.disabled = true;
}

/* Obtiene la última clave */
function numClave() {
    return localStorage.length ? parseInt(localStorage.key(0)) + 1 : 1;
}

/* Guarda en LocalStorage las sesiones */
function guardaLocal() {
    let hoy, fecha, hora, fechaHora;
    guarda.disabled = true;

    hoy = new Date();
    fecha = `${digitos(hoy.getDate())}-${digitos(hoy.getMonth() + 1)}-${hoy.getFullYear()}`;
    hora = `${digitos(hoy.getHours())}:${digitos(hoy.getMinutes())}:${digitos(hoy.getSeconds())}`;
    fechaHora = fecha + ' ' + hora;

    sesion.push({'segundos': contador, 'fechaHora': fechaHora});
    localStorage.setItem(numSesion, JSON.stringify(sesion));

    creaTabla('<i class="bi bi-stopwatch"></i>&nbsp; Sesión actual');
    creaFilas(numSesion, JSON.stringify(sesion));

    borrar.disabled = false;
    histor.disabled = false;
    guarda.disabled = false;
}

/* Muestra el contenido de LocalStorage */
function historLocal() {
    let clave, valor;
    histor.disabled = true;

    creaTabla('<i class="bi bi-list-ol"></i>&nbsp; Sesiones guardadas');

    // alt: for (i in localStorage) console.log(localStorage[i]);
    for (i = 0; i < localStorage.length; i++)  {  
        clave = localStorage.key(i);
        valor = localStorage.getItem(clave);
        creaFilas(clave, valor);
    }
}

/* Borra el contenido de LocalStorage */
function borrarLocal() {
    borrar.disabled = true;
    localStorage.clear();
    listado.textContent = '';
    histor.disabled = true;
}

function creaTabla(titulo) {
    let thead, tbody, tr, th, hr;

    tr = creaElem('tr');

    th = creaElem('th');
    th.classList.add('ancho');
    th.textContent = 'Clave';
    tr.appendChild(th);
    th = creaElem('th');
    th.classList.add('ancho');
    th.textContent = 'Núm.';
    tr.appendChild(th);
    th = creaElem('th');
    th.textContent = 'Crono';
    tr.appendChild(th);
    th = creaElem('th');
    th.classList.add('fecha');
    th.textContent = 'Fecha/Hora';
    tr.appendChild(th);
    th = creaElem('th');
    th.classList.add('ancho');
    th.textContent = 'Borra';
    tr.appendChild(th);

    thead = creaElem('thead');
    thead.appendChild(tr);

    tbody = creaElem('tbody');
    tbody.setAttribute("id", "cuerpo");

    caption = creaElem('caption');
    caption.innerHTML = '<h2>' + titulo + '</h2>';
    table = creaElem('table');
    table.append(caption, thead, tbody);

    listado.textContent = '';
    hr = creaElem('hr');
    listado.append(hr, table);
}

function creaFilas(clave, valor) {
    let tr, th, td;
    valor = JSON.parse(valor);

    valor.forEach((obj, i) => {
        tr = creaElem('tr');
        if (!i) {
            th = creaElem('th');
            th.setAttribute('rowspan', valor.length);
            th.setAttribute('scope', 'rowgroup')
            th.textContent = clave;
            tr.appendChild(th);
        }

        td = creaElem('td');
        td.textContent = i + 1;
        tr.appendChild(td);

        td = creaElem('td');
        td.textContent = tiempo(obj.segundos);
        tr.appendChild(td);

        td = creaElem('td');
        td.textContent = obj.fechaHora;
        tr.appendChild(td);

        if (!i) {
            td = creaElem('td');
            td.setAttribute('rowspan', valor.length);
            if (!i) td.innerHTML = '<i class="bi bi-trash3"></i>';
            tr.appendChild(td);
        }
        elemento('#cuerpo').appendChild(tr);
    });
}

function tiempo(numero) {
    let minutos, segundos, formato;
    if (numero >= 60) {
        minutos  = digitos(Math.trunc(numero / 60));
        segundos = digitos(numero % 60);
    } else {
        minutos  = 0;
        segundos = digitos(numero);
    }
    formato = segundos + 's';
    if (minutos) formato = minutos + 'min:' + formato;

    return formato;
}

/* Devuelve un elemento */
function elemento(sel) { return document.querySelector(sel); }

/* Crea y un elemento y lo devuelve */
function creaElem(el)  { return document.createElement(el);  }