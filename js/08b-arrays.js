/*
BATERÍA DE EJERICICIOS ARRAYS:

let coches= [
    { marca: 'Fiat', caballos: 75, color: "rojo", puertas: 3 },
    { marca: 'lamborghini', caballos: 300, color: "amarillo", puertas: 3 },
    { marca: 'renault', caballos: 160, color: "verde", puertas: 5 },
    { marca: 'ferrari', caballos: 750, color: "negro", puertas: 3 }
]
  - Queremos copiar nuestro array coches a otro llamado cochesDeAltaGama donde todos sean de alta gama
  - Queremos copiar a otro array aquellos coches que tengan mas de 100 caballos y tengan 3 puertas
  - Utilizando un método de array, queremos borrar el primer y ultimo elemento del array guardándolo en una variable
  - Sustituir coche[2] por otro objeto coche que vosotros querais (intentad usar splice sino como podais)
  
let numeros = [ 231, 85 , 123, 5 , 52 , 64 , 2 , 0 , 78, 86 ]

  - Queremos guardar una copia del array pero cada elemento debe estar multiplicado por 3.
  - Una vez tengamos la copia del array multiplicada por 3 queremos filtrar aquellos números divisibles entre 5
  - Ahora debemos crear un array de numeros (con los numeros que querais), crearemos un segundo array el cual sea el
  resultado de concatenar el array creado más los que esten filtrados del anterior y en ese array ordenarlos de mayor
  a menor (ACORDAOS DE QUE SE PUEDE PASAR UNA FUNCIÓN PARA ORDENAR AL .sort(), COMO HIZO BORJA).
  */


  /* -- TESTS -- */

let coches = [
  { marca: "Fiat", caballos: 75, color: "rojo", puertas: 3 },
  { marca: "lamborghini", caballos: 300, color: "amarillo", puertas: 3 },
  { marca: "renault", caballos: 160, color: "verde", puertas: 5 },
  { marca: "ferrari", caballos: 750, color: "negro", puertas: 3 },
];

let cochesDeAltaGama = coches.filter(
  coche => coche.marca == 'ferrari' || coche.marca == 'lamborghini'
);
console.log(cochesDeAltaGama);

let tresPuertas = coches.filter(coche => coche.puertas == 3);
console.log(tresPuertas);

let caballos = coches.filter(coche => coche.caballos >= 300);
console.log(caballos);