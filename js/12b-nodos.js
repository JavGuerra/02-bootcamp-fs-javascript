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

let numCols = 15;
let numFils = 5;
elemento('#numCols').innerText = numCols;
elemento('#numFils').innerText = numFils;

let btnTabla = elemento('#btnTabla');
let btnCreaF = elemento('#btnCreaF');
let btnBorrF = elemento('#btnBorrF');
btnTabla.onclick  = poneTabla;
btnCreaF.onclick  = nuevaFila;
btnBorrF.onclick  = quitaFila;
btnCreaF.disabled = true;
btnBorrF.disabled = true;

function elemento(sel) { return document.querySelector(sel); }
function creaNodo(el)  { return document.createElement(el); }

function poneTabla() {
    btnTabla.disabled = true;
    let padre = elemento('main');
    let tabla = createTable(numCols, numFils);
    padre.appendChild(tabla);
    btnCreaF.disabled = false;
    btnBorrF.disabled = false;
}

function createTable(numero1, numero2) {
    let tabla, thead, tbody, tr, th = null;
    // thead
    tr = creaNodo('tr');
    for (let i = 0; i <= numero1; i++) {
        th = creaNodo('th');
        th.innerText = i;
        tr.appendChild(th);
    }
    thead = creaNodo('thead');
    thead.appendChild(tr);
    // tbody
    tbody = creaNodo('tbody');
    for (let i = 1; i <= numero2; i++) {
        tr = creaTr(numero1, i);
        tbody.appendChild(tr);
    }
    // table
    tabla = creaNodo('table');
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    return tabla;
}

function deleteTable() {
    btnCreaF.disabled = true;
    btnBorrF.disabled = true;
    let table = elemento('table');
    table.remove();
    btnTabla.disabled = false;
}

function nuevaFila() {
    btnCreaF.disabled = true;
    let tbody, tr, numOrden; 
    tbody = elemento('tbody');
    numOrden = tbody.children.length + 1;
    tr = creaTr(numCols, numOrden);
    tbody.appendChild(tr);
    btnCreaF.disabled = false;
}

function creaTr(cols, i) {
    let tr, th, td;
    tr = creaNodo('tr');
    th = creaNodo('th');
    th.innerText = i;
    tr.appendChild(th);
    for (let i = 1; i <= cols; i++) {
        td = creaNodo('td');
        tr.appendChild(td);
    }
    return tr;
}

function quitaFila() {
    btnBorrF.disabled = true;
    let tbody = elemento('tbody');
    tbody.lastElementChild.remove();
    // ¿Quedan filas?
    if (tbody.children.length >= 1) {
        btnBorrF.disabled = false;
    } else {
        deleteTable();
    }
}