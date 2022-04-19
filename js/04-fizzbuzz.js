/*
Fizz buzz
=========
  Imprime todos los números del 1 al 1000 por consola, con la salvedad de todos
  aquellos números que sean múltiplos de 3 que en vez de imprimir el número, se
  imprimirá fizz y además, en lugar de los números que sean múltiplos de 5 se
  imprimirá buzz. Si el número es múltiplo de 3 y de 5, imprimir fizzbuzz.
*/

const INICIO = 1;
const FINAL = 1000; // FINAL > INICIO
let resultado = '0';

for (let i = INICIO; i <= FINAL; i++) {
  resultado += ', ';

  if (i % 3 == 0  ||  i % 5 == 0) {
    if (i % 3 == 0) resultado += 'fizz';
    if (i % 5 == 0) resultado += 'buzz';
  } else {
    resultado += i;
  }

} // end for()

console.log (resultado);
