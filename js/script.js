function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('contenido');

fetch("js/listado.json")
.then(resp => resp.json())
.then(function(data) {
    let contenidos = data.results;
    return contenidos.map(function(contenido) {
      let span = createNode('span');
      img.src = contenido.picture.medium;
      span.innerHTML = `${contenido.titulo} - ${contenido.enlace}`;
      append(li, span);
    })
  })
.catch(err => console.error(err))
