/* -- TESTS -- */

console.log(Math.floor(Math.abs(-1.5)));

function esPrimo(numero) {
  numero = parseInt(numero);
  console.log(numero);
  let contador = 0;
  for (let i = 1; i <= numero; i++) {
    if (numero % i == 0) contador++;
  }
  return contador == 2; // Divisble por 2 números: 1 y si mismo.
}

console.log(esPrimo(false));


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

