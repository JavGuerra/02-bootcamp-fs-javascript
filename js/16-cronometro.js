/* 
Diseñaremos un HTML que represente un cronómetro con el formato que queramos, por ejemplo: 00:00
Añadiremos tres botones
- Iniciar: Activará el cronómetro, incrementando el contador cada 1 segundo
- Parar: Detiene el cronómetro
- Contar hasta 10: Iniciará el cronómetro y lo parará a los 10 segundos

https://www.w3schools.com/jsref/met_win_settimeout.asp
https://www.w3schools.com/jsref/met_win_setinterval.asp
*/

// Nota: La aplicación maneja sólo minutos y segundos.

let cronometro, parada10s;
let contador = 0;

const inicia = elemento('#inicia');
const parate = elemento('#parate');
const cuenta = elemento('#cuenta');
const valors = elemento('#valors');

inicia.onclick = iniciaCrono;
parate.onclick = parateCrono;
cuenta.onclick = cuentaCrono;

parate.disabled  = true;


/* Devuelve un elemento */
function elemento(sel)  { return document.querySelector(sel); }

/* Activa el cronómetro */
function iniciaCrono() {
    parateCrono();
    boton(inicia);
    contador = -1; // Porque sumaCromo() le suma 1.
    sumaCrono();
    cronometro = setInterval(sumaCrono, 1000);
}

/* Para el cronómetro / contador */
function parateCrono() {
    boton(parate);
    if (cronometro) {
        clearInterval(cronometro);
        cronometro = null;
    }
    if (parada10s ) {
        clearInterval(parada10s );
        parada10s  = null;
    }
}

/* Inicia la cuenta hasta 10 */
function cuentaCrono() {
    parateCrono();
    boton(cuenta);
    contador = 11; // Porque restaCuenta() le resta 1.
    restaCuenta();
    cronometro = setInterval(restaCuenta, 1000);
    parada10s  = setTimeout(parateCrono, tiempo());
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
    valors.innerHTML = formato;
}

/* Resta y muestra el contador */
function restaCuenta() {
    contador--;
    formato = `<span class="tiempo">${digitos(contador)}</span>`
            + '<span class="medida"> s</span>';   
    valors.innerHTML = formato;
}

/* Devuelve dos dígitos */
function digitos(numero) {
    return numero < 10 ? '0' + numero : numero ;
}

/* Activa y desactiva botones */
function boton(boton) {
    inicia.disabled = false;
    parate.disabled = false;
    cuenta.disabled = false;
    boton.disabled  = true;
}

/* Contador según navegador */
function tiempo() {
    return navigator.userAgent.indexOf("Firefox") > -1 ? 11000 : 10000;
}
