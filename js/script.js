let article;
const lista = document.getElementById('listado');

fetch('js/listado.json')
.then(resp => resp.json())
.then(data => {
    return data.forEach(tarea => {
        article = document.createElement('article');
        article.innerHTML =
         `<a target="_blank" href="${tarea.enlace}">${tarea.titulo}</a>`;
        lista.appendChild(article);
    })
  })
.catch(err => console.error(err))
