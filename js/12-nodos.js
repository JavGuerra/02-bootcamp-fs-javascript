/*
Creamos un index.html que contenga:
- Section (1), article (1), h2(1)
- 3 botones (1 para añadir, 1 para borrar, 1 para reemplazar)

Creamos un index.js el cual realice 3 funciones (una por botón), es decir: 
- Función que cree un article nuevo  
- Función que reemplace el ÚLTIMO article por otro article con distinto contenido 
- Función que elimine el ultimo article que haya.
*/

// let btnCrear = document.getElementById('bC');
// let btnReemp = document.getElementById('bR');
// let btnBorra = document.getElementById('bB');
// let elPadre  = document.getElementById('ar');
// btnCrear.addEventListener('click', creaP);
// btnReemp.addEventListener('click', reemplazaP);
// btnBorra.addEventListener('click', borraP)

function elemento(sel) {
    return document.querySelector(sel);
}
function creaNodo(el) {
    return document.createElement(el);
}
function conectaNodo(padre, el) {
    return padre.appendChild(el);
}

elemento('#btnCrea').onclick = creaP; // btnCrear.addEventListener('click', crea);
elemento('#btnReem').onclick = reemplazaP;
elemento('#btnBorr').onclick = borraP;

let elPadre = elemento('#rtcl');
let texto1  = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.¶";
let texto2  = '¡Supercalifragilisticoespialidoso!¶';

function creaP() {
    let parrafo = creaNodo('p'); // document.createElement('p');
    parrafo.innerText = texto1;
    conectaNodo(elPadre, parrafo); // elPadre.appendChild(parrafo);
};

function reemplazaP() {
    let el = elPadre.lastElementChild;
    if (el.tagName == 'P') {
        let parrafo = creaNodo('p');
        parrafo.innerText = texto2;
        elPadre.replaceChild(parrafo, el);
    }
}

function borraP() {
    let el = elPadre.lastElementChild;
    if (el.tagName == 'P') el.remove(); //elPadre.removeChild(el);
}


