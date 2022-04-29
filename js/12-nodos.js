/*
Creamos un index.html que contenga:
- Section (1), article (1), h2(1)
- 3 botones (1 para añadir, 1 para borrar, 1 para reemplazar)

Creamos un index.js el cual realice 3 funciones (una por botón), es decir: 
- Función que cree un article nuevo  
- Función que reemplace el ÚLTIMO article por otro article con distinto contenido 
- Función que elimine el ultimo article que haya.

Nuevo ejercicio
- Botón colorear article pares
- Botón eliminar article reemplazados
+ Deshabilitar botones que no tengan funcionalidad.
*/

// let btnCrear = document.getElementById('btnCrea');
// let btnReemp = document.getElementById('btnReem');
// let btnBorra = document.getElementById('btnBorr');
// let elPadre  = document.getElementById('sctn');
// btnCrear.addEventListener('click', crea);
// btnReemp.addEventListener('click', reemplaza);
// btnBorra.addEventListener('click', borra)

function elemento(sel) {
    return document.querySelector(sel);
}
function elementos(sel) {
    return document.querySelectorAll(sel);
}
function creaNodo(el) {
    return document.createElement(el);
}
function conectaNodo(padre, el) {
    return padre.appendChild(el);
}
function longPadre() {
    return elPadre.children.length;
}
function esPar() {
    return longPadre() % 2 == 0;
}
function btnColor() {
    if (pintar) {
        btnColo.classList.add('btnColor');
    } else {
        btnColo.classList.remove('btnColor');
    }
}
function botones(poner) {
    if (poner) {
        btnReem.disabled = false;
        btnColo.disabled = false;
        btnBorr.disabled = false;
    } else {
        btnReem.disabled = true;
        btnColo.disabled = true;
        btnBorr.disabled = true;
        btnLimp.disabled = true;
        retira = 0;
        pintar = false;
        btnColor();
    }
    borrar = !borrar;
}

let btnCrea = elemento('#btnCrea');
let btnReem = elemento('#btnReem');
let btnColo = elemento('#btnColo');
let btnBorr = elemento('#btnBorr');
let btnLimp = elemento('#btnLimp');

btnCrea.onclick  = crea; // btnCrear.addEventListener('click', crea);
btnReem.onclick  = reemplaza;
btnColo.onclick  = colorea;
btnBorr.onclick  = borra;
btnLimp.onclick  = limpia;
btnLimp.disabled = true;

const elPadre = elemento('#sctn');
const elHijo  = 'ARTICLE';
const texto1  = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.¶";
const texto2  = '¡Supercalifragilisticoespialidoso!¶';
let   pintar  = false;  // Coloreado
let   reempl  = false;  // ¿Última línea reemplazada?
let   borrar  = true;   // ¿Queda algo por borrar?
let   retira  = 0;      // ¿Cuánto hay que limpiar?

function crea() {
    btnCrea.disabled = true;
    let nuevo = creaNodo(elHijo); // document.createElement(elHijo);
    nuevo.innerText = texto1;
    if (pintar && esPar()) {
        nuevo.classList.add('pares'); 
    }
    conectaNodo(elPadre, nuevo); // elPadre.appendChild(nuevo);
    if (!borrar) botones(true);
    if (reempl) {
        reempl = false;
        btnReem.disabled = false;
    }
    btnCrea.disabled = false;
};

function reemplaza() {
    btnReem.disabled = true;
    let el = elPadre.lastElementChild;
    if (el.tagName == elHijo) {
        let nuevo = creaNodo(elHijo);
        nuevo.innerText = texto2;
        if (pintar && esPar()) {
            nuevo.classList.add('pares'); 
        }
        elPadre.replaceChild(nuevo, el);
        reempl = true;
        retira++;
        btnLimp.disabled = false;
    }
}

function colorea () {
    btnColo.disabled = true;
    let pares = elementos(`${elHijo}:nth-child(odd)`);
    pares.forEach(el => {
        if (pintar) {
            el.classList.remove('pares');
        } else {
            el.classList.add('pares'); // el.className = 'pares';
        }
    });
    pintar = !pintar;
    btnColor();
    btnColo.disabled = false;
}

function borra() {
    btnBorr.disabled = true;
    let el  = elPadre.lastElementChild;
    let txt = el.firstChild.textContent;
    if (el.tagName == elHijo) {
        el.remove(); //elPadre.removeChild(el);
        if (longPadre() > 1) {
            if (txt == texto2) retira--;
            if (retira == 0) {
                btnLimp.disabled = true;
            }
            // ¿Qué tenemos ahora en el último el?
            el  = elPadre.lastElementChild;
            txt = el.firstChild.textContent;
            if (txt == texto2) {
                reempl = true;
                btnReem.disabled = true;
            } else {
                reempl = false;
                btnReem.disabled = false;
            }
            btnBorr.disabled = false;       
        } else {
            botones(false);
        }
    } else {
        botones(false);
    }
}

function limpia() {
    btnLimp.disabled = true;
    let elsReem = elementos(elHijo);
    elsReem.forEach( el => {
        el.classList.remove('pares');
        let txt = el.firstChild.textContent;
        if (txt == texto2) el.remove();
    });
    if (longPadre() > 1) {
        retira = 0;
        if (pintar) {
            pintar = !pintar;
            colorea();
        }
        if (reempl) {
            reempl = false;
            btnReem.disabled = false;
        }
    } else {
        botones(false); 
    }
}

