function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('listado');

fetch("js/listado.json")
.then(resp => resp.json())
.then(function(data) {
    console.log(data);
    return data.map(function(contenido) {
      let li = createNode('li');
      let span = createNode('span');
      span.innerHTML = `${contenido.titulo} - ${contenido.enlace}`;
      append(li, span);
      append(ul, li);
    })
  })
.catch(err => console.error(err))
