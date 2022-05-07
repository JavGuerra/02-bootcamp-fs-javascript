/* «Mosaico» por Javier Guerra, mayo 2022 */

/* Enunciado:
Creamos una tabla de 16 x 16 celdas cuadradas de p.ej. 20px x 20px, con fondo
blanco y borde, y creamos también unos botones de colores (al menos 4 u 8
colores/botones) para poder seleccionar el color con el que vamos a pintar
las celdas del mosaico. Se deberá poner el fondo del botón del color que
representa. Cada vez que hacemos click en una de las celdas de la tabla
(mosaico), esta se pondrá del color de fondo del botón seleccionado, pudiendo
de esta forma hacer dibujos de colores en él. El botón seleccionado al inicio
será el negro, Con el botón de color blanco podemos "borrar" el color de las
celdas al hacer click en ellas. */

const btnNegro    = elemento('#btnNegro'   );
const btnAzul     = elemento('#btnAzul'    );
const btnRojo     = elemento('#btnRojo'    );
const btnMagenta  = elemento('#btnMagenta' );
const btnVerde    = elemento('#btnVerde'   );
const btnCian     = elemento('#btnCian'    );
const btnAmarillo = elemento('#btnAmarillo');
const btnBlanco   = elemento('#btnBlanco'  );

btnNegro.onclick    = color;
btnAzul.onclick     = color;
btnRojo.onclick     = color;
btnMagenta.onclick  = color;
btnVerde.onclick    = color;
btnCian.onclick     = color;
btnAmarillo.onclick = color;
btnBlanco.onclick   = color;

const numCols = 16;
const numFils = 16;

let btnSel  = btnNegro; // Selección Btn
let pincel  = btnSel.className; // Color

elemento('main').appendChild( creaTabla(numCols, numFils) );

btnSel.classList.add('seleccion');


function elemento(sel) { return document.querySelector(sel); }

function creaElem(el)  { return document.createElement(el);  }

function creaTabla(numCols, numFils) {
    let table, tbody, tr, td;
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
    table = creaElem('table');
    table.appendChild(tbody);
    return table;
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
