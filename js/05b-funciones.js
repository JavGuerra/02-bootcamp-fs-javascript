/*
1.- Crea la función potenciacion que acepte como argumento dos números y devuelva
el resultado de elevar el primero(a) al segundo(b) (a^b)

2.- Crea la función repetirString que acepte como argumento un string y un número
y devuelva un string que sea el resultado de concatenar el primer string el
número dado de veces

3.- Crea la función esPrimo que acepte como argumento un número y devuelva true
si es primo y false si no lo es
*/

/* -- Ejercicio 1 -- */

function potenciacion(numero1, numero2 = 1) {
  let resultado = null;
  if (!isNaN(numero1) && !isNaN(numero2)) {
    resultado = numero1 ** numero2;
  }
  return resultado;
}

// Anónimas autoejecutables
(function (numero1, numero2 = 1) {console.log(numero1 ** numero2);})(2, 3); // Clásica
((function (numero1, numero2 = 1) {console.log(numero1 ** numero2);})(2, 3)); // Crockford
+function (numero1, numero2 = 1) {console.log(numero1 ** numero2);}(2, 3); // Unitaria
!function (numero1, numero2 = 1) {console.log(numero1 ** numero2);}(2, 3); // Facebook

// Flecha
let potenciacion2 = (numero1, numero2 = 1) => numero1 ** numero2;

((numero1, numero2 = 1) => console.log(numero1 ** numero2))(2, 3); // Flecha autoejecutable


/* -- Ejercicio 2 -- */

function repetirString(cadena, numero) {
  let resultado = '';
  if (!isNaN(numero)) {
    numero = Math.floor(Math.abs(numero));
    if (numero > 0) {
      for (let i = 1; i <= numero; i++) resultado += cadena;
    }
  }
  return resultado;
}

// Flecha
let repetirString2 = (cadena, numero) => {
  let resultado = '';
  if (!isNaN(numero)) {
    numero = Math.floor(Math.abs(numero));
    if (numero > 0) {
      for (let i = 1; i <= numero; i++) resultado += cadena;
    }
  }
  return resultado;
}

let repetirString3 = (s, n) => s.repeat(n); // Borja


/* -- Ejercicio 3 -- */

function esPrimo(numero) {
  let contador = 0; // Número de veces que el resto (%) es 0.
  if (!isNaN(numero)) {
    numero = Math.floor(Math.abs(numero));
    let i = 1;
    while (i <= numero && contador <= 2) {
      if (numero % i == 0) contador++;
      i++;
    }
  }
  return contador == 2; // Divisible por 2 números: 1 y si mismo.
}

// Flecha

let esPrimo2 = numero => {
  let contador = 0; // Número de veces que el resto (%) es 0.
  if (!isNaN(numero)) {
    numero = Math.floor(Math.abs(numero));
    let i = 1;
    while (i <= numero && contador <= 2) {
      if (numero % i == 0) contador++;
      i++;
    }
  }
  return contador == 2; // Divisible por 2 números: 1 y si mismo.
}


/* -- Test -- */

console.log(potenciacion(2, 3));
console.log(potenciacion2(3, 2));

console.log(repetirString('Hola', 2));
console.log(repetirString2('Hola', 3));
console.log(repetirString3('Hola', 4));

console.log(esPrimo(1));
console.log(esPrimo2(3));
