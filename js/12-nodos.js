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
function esPar() {
    return elPadre.children.length % 2;
}
function btnColor() {
    if (pintar) {
        elemento('#btnColo').classList.add('btnColor');
    } else {
        elemento('#btnColo').classList.remove('btnColor');
    }
}
function botones(poner) {
    if (poner) {
        elemento('#btnReem').disabled = false;
        elemento('#btnColo').disabled = false;
        elemento('#btnBorr').disabled = false;
    } else {
        elemento('#btnReem').disabled = true;
        elemento('#btnColo').disabled = true;
        elemento('#btnBorr').disabled = true;
        elemento('#btnLimp').disabled = true;
        reempl = false;
        pintar = false;
        btnColor();
    }
    borrar = !borrar;
}

elemento('#btnCrea').onclick  = crea; // btnCrear.addEventListener('click', crea);
elemento('#btnReem').onclick  = reemplaza;
elemento('#btnColo').onclick  = colorea;
elemento('#btnBorr').onclick  = borra;
elemento('#btnLimp').onclick  = limpia;

elemento('#btnLimp').disabled = true;

const elPadre = elemento('#sctn');
const elHijo  = 'ARTICLE';
const texto1  = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.¶";
const texto2  = '¡Supercalifragilisticoespialidoso!¶';
let   pintar  = false; // Coloreado
let   borrar  = true;  // ¿Queda algo por borrar?
let   reempl  = false; // ¿Algo reemplazado?

function crea() {
    let nuevo = creaNodo(elHijo); // document.createElement(elHijo);
    nuevo.innerText = texto1;
    if (pintar && esPar() == 0) {
        nuevo.classList.add('pares'); 
    }
    conectaNodo(elPadre, nuevo); // elPadre.appendChild(nuevo);
    if (!borrar) botones(true);
};

function reemplaza() {
    let el = elPadre.lastElementChild;
    if (el.tagName == elHijo) {
        let nuevo = creaNodo(elHijo);
        nuevo.innerText = texto2;
        if (pintar && esPar() != 0) {
            nuevo.classList.add('pares'); 
        }
        elPadre.replaceChild(nuevo, el);
        if (!reempl) {
            reempl = true;
            elemento('#btnLimp').disabled = false;
        }
    }
}

function colorea () {
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
}

function borra() {
    let el = elPadre.lastElementChild;
    if (el.tagName == elHijo) {
        el.remove(); //elPadre.removeChild(el);
        if (elPadre.children.length == 1) {
            botones(false);           
        }
    } else {
        botones(false);
    }
}

function limpia() {
    let elsMod = elementos(elHijo);
    elsMod.forEach( el => {
        el.classList.remove('pares');
        let txt = el.firstChild.textContent;
        if (txt == texto2) el.remove();
    });
    if (pintar) {
        pintar = !pintar;
        colorea();
    }
    if (elPadre.children.length == 1) {
        botones(false);           
    } else {
        reempl = false;
        elemento('#btnLimp').disabled = true;
    }
}

