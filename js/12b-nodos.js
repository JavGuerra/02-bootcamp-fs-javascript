/*
EJERCICIO CREAR TABLA
- Crearemos una función createTable(numero1, numero2) que reciba por parametros
dos números, el primero de ellos determinará el número de filas y el segundo el
numero de columnas.
- La tabla debe tener borde, El tamaño de cada una de las celdas debe ser fijo.
(ej.: width: 20px, heigth: 20px)
- La función retornará una tabla que añadiremos a nuestro HTML- Añadiremos 3
botones: Crear tabla, Añadir fila y Borrar fila (añade al final o borra la
última) intentaremos que los botones Añadir y Borrar estén deshabilitados hasta
que se cree la tabla.
*/

const numCols = 15;
const numFilas = 5;
elemento('#numCols').textContent  = numCols;
elemento('#numFilas').textContent = numFilas;

const btnTabla = elemento('#btnTabla');
const btnCreaF = elemento('#btnCreaF');
const btnBorrF = elemento('#btnBorrF');

btnTabla.onclick  = poneTabla;
btnCreaF.onclick  = nuevaFila;
btnBorrF.onclick  = quitaFila;

btnCreaF.disabled = true;
btnBorrF.disabled = true;

let tbody; // Se define en createTable()

function elemento(sel) { return document.querySelector(sel); }

function creaElem(el)  { return document.createElement(el);  }

function poneTabla() {
    btnTabla.disabled = true;

    let padre = elemento('main');
    let tabla = createTable(numCols, numFilas);
    padre.appendChild(tabla);

    btnCreaF.disabled = false;
    btnBorrF.disabled = false;
}

function createTable(numCols, numFilas) {
    let table, thead, tr, th;

    // thead
    tr = creaElem('tr');
    for (let i = 0; i <= numCols; i++) { // Salen numCols + 1
        th = creaElem('th');
        th.textContent = i;
        tr.appendChild(th);
    }
    thead = creaElem('thead');
    thead.appendChild(tr);

    // tbody
    tbody = creaElem('tbody');
    for (let i = 1; i <= numFilas; i++) {
        tr = creaTr(numCols, i);
        tbody.appendChild(tr);
    }

    // table
    table = creaElem('table');
    table.appendChild(thead);
    table.appendChild(tbody); // alt.: tabla.append(thead, tbody)

    return table;
}

function deleteTable() {
    btnCreaF.disabled = true;

    let table = elemento('table');
    table.remove();

    btnTabla.disabled = false;
}

function nuevaFila() {
    btnCreaF.disabled = true;
    let tr, filaNum; 

    filaNum = tbody.children.length + 1; // alt.: tbody.childElementCount
    tr = creaTr(numCols, filaNum);
    tbody.appendChild(tr);

    btnCreaF.disabled = false;
}

function creaTr(numCols, filaNum) {
    let tr, th, td;

    tr = creaElem('tr');

    // Primera columna numerada
    th = creaElem('th');
    th.textContent = filaNum;
    tr.appendChild(th);

    // Resto de columnas
    for (let i = 1; i <= numCols; i++) {
        td = creaElem('td');
        tr.appendChild(td);
    }

    return tr;
}

function quitaFila() {
    btnBorrF.disabled = true;

    tbody.lastElementChild.remove();

    // ¿Quedan filas?
    if (tbody.children.length >= 1) {
        btnBorrF.disabled = false;
    } else {
        deleteTable();
    }
}