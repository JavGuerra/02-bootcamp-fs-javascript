/*
Declaramos un array con 10 numeros como valores
Declaramos una variable para guardar cuantos numeros pares hay, otra para los impares
Declaramos una variable para guardar el valor de la suma total de los elementos
Declaramos una variable donde guardaremos la media de los números
Recorremos el array y caculamos los numeros pares, los numeros impares, la media de los numeros 
*/

const VECTOR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
const L = VECTOR.length; // 10
let pares = impares = total = media = 0;

for (let i = 0; i < L; i++) {
  if (VECTOR[i] % 2 == 0) pares++;
  total += VECTOR[i];
}

impares = L - pares;
media = total / L;

console.log(
  `Resultado: pares=${pares}, impares=${impares}, total=${total}, media=${media}`
);
