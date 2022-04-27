function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const lista = document.getElementById('listado');

fetch("js/listado.json")
.then(resp => resp.json())
.then(function(data) {
    return data.map(function(contenido) {
        let article = createNode('article');
        article.innerHTML =
         `<a target="_blank" href="${contenido.enlace}">${contenido.titulo}</a>`;
        append(lista, article);
    })
  })
.catch(err => console.error(err))
