fetch('js/listado.json')
.then(resp => resp.json())
.then(data => {
    const lista = document.getElementById('listado');
    let article;
    for (tarea of data) {
        article = document.createElement('article');
        article.innerHTML =
         `<a target="_blank" href="${tarea.enlace}">${tarea.titulo}</a>`;
        lista.appendChild(article);
    }
  })
.catch(err => console.error(err))
