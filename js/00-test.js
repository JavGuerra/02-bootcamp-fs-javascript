let vector = [];
max = 100;
min = 1;
pagina = 11;
elementos = 10;

numEl = 93;

for (let i = 0; i < numEl; i++)
  vector.push(Math.floor(Math.random() * (max - min)) + min);

paginacion(vector, pagina, elementos);

function paginacion(vector, pagina, elementos) {
  let longitud, numPags, inicio;
  longitud = vector.length;
  if (longitud) {
    numPags = Math.ceil(longitud / elementos);
    if (pagina > numPags) pagina = numPags;
    if (pagina < 1) pagina = 1;
    inicio = (pagina - 1) * elementos;
    if (longitud < elementos) {
      elementos = longitud;
    } else if (longitud - inicio < elementos) {
      elementos = longitud - inicio;
    }
    controlBotones();
    listaElementos(vector, inicio, elementos);
  }
}

function controlBotones() {
  if (pagina == 1) {
  }
  if (pagina == numPags) {
  }
  if (numPags >= 3 && pagina > 1 && pagina < numPags) {
  }
}

function listaElementos(vector, inicio, elementos) {}

