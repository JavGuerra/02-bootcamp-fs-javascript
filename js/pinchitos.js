/* Pinchitos, (CC BY) Javier Guerra, mayo 2022 */

let numCols = 16;
let numFils = 16;

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

let pincel = 'negro';
let btnSel = btnNegro;

let padre = elemento('main');
let tabla = createTabla(numCols, numFils);
padre.appendChild(tabla);

function elemento(sel) { return document.querySelector(sel); }

function creaNodo(el)  { return document.createElement(el); }

function createTabla(numCols, numFils) {
    let tabla, tbody, tr, td;
    // tbody
    tbody = creaNodo('tbody');
    for (let i = 1; i <= numFils; i++) {
        tr = creaNodo('tr');
        for (let i = 1; i <= numCols; i++) {
            td = creaNodo('td');
            td.classList.add('blanco');
            td.onclick = pinta;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    // table
    tabla = creaNodo('table');
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
