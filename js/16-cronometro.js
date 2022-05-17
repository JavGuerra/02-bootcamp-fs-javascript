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
let minutos, segundos, formato;
let numero, contador = 0;

const inicia = elemento('#inicia');
const parate = elemento('#parate');
const cuenta = elemento('#cuenta');
const valors = elemento('#valors');

inicia.onclick = iniciaCrono;
parate.onclick = parateCrono;
cuenta.onclick = cuentaCrono;

parateCrono();


/* Devuelve un elemento */
function elemento(sel)  { return document.querySelector(sel); }

/* Activa el cronómetro */
function iniciaCrono() {
    parateCrono();
    inicia.disabled = true;
    cronometro = setInterval(sumaCrono, 1000);
    parate.disabled = false;
    cuenta.disabled = false;
}

/* Para el cronómetro / contador */
function parateCrono() {
    parate.disabled = true;
    if (cronometro) clearInterval(cronometro);
    if (parada10s ) clearInterval(parada10s );
    inicia.disabled = false;
    cuenta.disabled = false;
    formato = `<span class="tiempo">${digitos(contador)}</span>`
    + '<span class="medida"> s</span>';
    valors.innerHTML = formato;
}

/* Inicia la cuenta hasta 10 */
function cuentaCrono() {
    parateCrono();
    cuenta.disabled = true;
    contador = 11;
    sumaCuenta(); // Pone inicio cuenta
    cronometro = setInterval(sumaCuenta, 1000);
    parada10s  = setTimeout(parateCrono, tiempo());
    parate.disabled = false;
    inicia.disabled = false;
}

/* Suma y muestra minutos y segundos */
function sumaCrono() {
    contador++;
    if (contador >= 60) {
        minutos  = digitos(Math.trunc(contador / 60));
        segundos = digitos(contador % 60);
    } else {
        segundos = digitos(contador);
    }
    formato = `<span class="tiempo">${segundos}</span>` + 
            '<span class="medida"> s</span>';
    if (minutos) {
        formato = `<span class="tiempo">${minutos}</span>` + 
            '<span class="medida"> min</span>' +
            '<span class="separa"> :</span>' + formato;
    }
    valors.innerHTML = formato;
}

/* Suma y muestra el contador */
function sumaCuenta() {
    contador--;
    formato = `<span class="tiempo">${digitos(contador)}</span>`
            + '<span class="medida"> s</span>';   
    valors.innerHTML = formato;
}

/* Devuelve dos dígitos */
function digitos(numero) {
    return numero < 10 ? '0' + numero : numero ;
}

/* Contador según navegador */
function tiempo() {
    return navigator.userAgent.indexOf("Firefox") > -1 ? 11000 : 10000;
}
