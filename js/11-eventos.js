/*
Definir un HTML con: 
- Parrafos, imágenes, section y article (x2)
- Boton (button)

Definiremos un script con los eventos: 
- Cambien el color de los parrafos al hacer click sobre ellos
- Bloques (section y acticle) cambiar color de fondo al hacer click sobre ellos
- Al hacer click en el boton, cambiar el contenido de uno de los parrafos (cambiar texto)
- Cambiar las imagénes (al hacer click) por otras que tengamos en nuestra carpeta
  (deberemos cambiar el atributo src) (Solo si sobra tiempo)
*/

// function rojo() {this.style.color = 'Crimson'};
// document.getElementById('p1').addEventListener('click', rojo);
// document.getElementById('p2').addEventListener('click', rojo);

// let parrafos =  document.getElementsByTagName("p");
// for (let i = 0; i < parrafos.length; i++) {
//     parrafos[i].addEventListener('click', function() {this.style.color = 'red'});
// };

document.querySelectorAll('p').forEach(
    el => el.addEventListener('click', () => el.style.color = 'red') );

document.getElementById('s1').addEventListener(
    'click', function() {this.style.background = 'LightGreen'});

// function azul() {this.style.background = 'PaleTurquoise'};
// document.getElementById('a1').addEventListener('click', azul);
// document.getElementById('a2').addEventListener('click', azul);

let articulos =  document.getElementsByTagName("article");
for (let i = 0; i < articulos.length; i++) {
    articulos[i].addEventListener('click', function() {
        this.style.background = 'PaleTurquoise'
    });
};

document.getElementById('b1').addEventListener('click', function() {
    document.getElementById('p1').innerText = 'Nuevo párrafo' });

// function imagen() {this.setAttribute('src', 'img/foto3.jpg')};
// document.getElementById('i1').addEventListener('click', imagen);
// document.getElementById('i2').addEventListener('click', imagen);

let imagenes =  document.getElementsByTagName("img");
for (let i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener('click', function() {
        this.setAttribute('src', 'img/foto3.jpg')
    });
};

