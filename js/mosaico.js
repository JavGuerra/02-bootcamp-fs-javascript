/* «Mosaico» (CC BY) Javier Guerra, mayo 2022 */

let btnNegro    = elemento('#btnNegro'   );
let btnAzul     = elemento('#btnAzul'    );
let btnRojo     = elemento('#btnRojo'    );
let btnMagenta  = elemento('#btnMagenta' );
let btnVerde    = elemento('#btnVerde'   );
let btnCian     = elemento('#btnCian'    );
let btnAmarillo = elemento('#btnAmarillo');
let btnBlanco   = elemento('#btnBlanco'  );

btnNegro.onclick    = color;
btnAzul.onclick     = color;
btnRojo.onclick     = color;
btnMagenta.onclick  = color;
btnVerde.onclick    = color;
btnCian.onclick     = color;
btnAmarillo.onclick = color;
btnBlanco.onclick   = color;

let numCols = 16;
let numFils = 16;
let btnSel  = btnNegro; // Selección Btn
let pincel  = btnSel.className; // Color
let padre   = elemento('main');
let tabla   = creaTabla(numCols, numFils);

btnSel.classList.add('seleccion');
padre.appendChild(tabla);


function elemento(sel) { return document.querySelector(sel); }

function creaElem(el)  { return document.createElement(el);  }

function creaTabla(numCols, numFils) {
    let tabla, tbody, tr, td;
    tbody = creaElem('tbody');
    for (let i = 1; i <= numFils; i++) {
        tr = creaElem('tr');
        for (let i = 1; i <= numCols; i++) {
            td = creaElem('td');
            td.classList.add('blanco');
            td.onclick = pinta; // ¡Magia!
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    tabla = creaElem('table');
    tabla.appendChild(tbody);
    return tabla;
}

// Selecciona botón y color del pincel
function color() {
    btnSel.classList.remove('seleccion');
    btnSel = this;
    pincel = this.className;
    btnSel.classList.add('seleccion');
}

// Pone el color del pincel en la celda
function pinta() { this.className = pincel; }
