/* Mosaico, (CC BY) Javier Guerra, mayo 2022 */

let btnNegro    = elemento('#btnNegro');
let btnAzul     = elemento('#btnAzul');
let btnRojo     = elemento('#btnRojo');
let btnMagenta  = elemento('#btnMagenta');
let btnVerde    = elemento('#btnVerde');
let btnCian     = elemento('#btnCian');
let btnAmarillo = elemento('#btnAmarillo');
let btnBlanco   = elemento('#btnBlanco');

btnNegro.onclick    = color;
btnAzul.onclick     = color;
btnRojo.onclick     = color;
btnMagenta.onclick  = color;
btnVerde.onclick    = color;
btnCian.onclick     = color;
btnAmarillo.onclick = color;
btnBlanco.onclick   = color;

let numCols = 16; // Columnas de la tabla
let numFils = 16; // Filas de la tabla
let btnSel  = btnNegro; // Botón seleccionado
let pincel  = btnSel.className; // Color del pincel
btnSel.classList.add('seleccion');

let padre   = elemento('main');
let tabla   = creaTabla(numCols, numFils);
padre.appendChild(tabla);

function elemento(sel) { return document.querySelector(sel); }

function creaElem(el)  { return document.createElement(el);  }

function creaTabla(numCols, numFils) {
    let tabla, tbody, tr, td;
    // tbody
    tbody = creaElem('tbody');
    for (let i = 1; i <= numFils; i++) {
        tr = creaElem('tr');
        for (let i = 1; i <= numCols; i++) {
            td = creaElem('td');
            td.classList.add('blanco');
            td.onclick = pinta; // Cambia color celda
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    // table
    tabla = creaElem('table');
    tabla.appendChild(tbody);
    return tabla;
}

function color() {
    btnSel.classList.remove('seleccion');
    btnSel = this;
    pincel = this.className;
    btnSel.classList.add('seleccion');
}

function pinta() { this.className = pincel; }
