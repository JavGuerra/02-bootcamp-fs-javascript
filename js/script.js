let listado;

fetch("js/listado.json")
.then(response => {
   return response.json();
})
.then(jsondata => listado = jsondata);

console.log(listado);