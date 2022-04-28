const lista = document.getElementById('listado');

fetch("js/listado.json")
.then(resp => resp.json())
.then(function(data) {
    return data.map(function(contenido) {
        let article = document.createElement('article');
        article.innerHTML =
         `<a target="_blank" href="${contenido.enlace}">${contenido.titulo}</a>`;
        lista.appendChild(article);
    })
  })
.catch(err => console.error(err))
