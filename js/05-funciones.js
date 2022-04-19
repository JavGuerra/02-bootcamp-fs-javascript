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

// Anónimas autoejecutables
(function (numero1, numero2 = 1) {console.log(numero1 ** numero2);})(2, 3); // Clásica
((function (numero1, numero2 = 1) {console.log(numero1 ** numero2);})(2, 3)); // Crockford
+function (numero1, numero2 = 1) {console.log(numero1 ** numero2);}(2, 3); // Unitaria
!function (numero1, numero2 = 1) {console.log(numero1 ** numero2);}(2, 3); // Facebook


function potenciacion(numero1, numero2 = 1) {
  return numero1 ** numero2;
}

// Flecha
let potenciacion2 = (numero1, numero2 = 1) => numero1 ** numero2;

((numero1, numero2 = 1) => console.log(numero1 ** numero2))(2, 3); // Flecha autoejecutable


/* -- Ejercicio 2 -- */

function repetirString(cadena, numero) {
  numero = parseInt(numero);
  let resultado = "";
  if (numero > 0) {
    for (let i = 1; i <= numero; i++) resultado += cadena;
  }
  return resultado;
}

// Flecha
let repetirString2 = (cadena, numero) => {
    numero = parseInt(numero);
    let resultado = "";
    if (numero > 0) {
      for (let i = 1; i <= numero; i++) resultado += cadena;
    }
    return resultado;
}

let repetirString3 = (s, n) => s.repeat(n); // Borja


/* -- Ejercicio 3 -- */

function esPrimo(numero) {
  numero = parseInt(numero);
  let contador = 0;
  for (let i = 1; i <= numero; i++) {
    if (numero % i == 0) contador++;
  }
  return contador == 2; // Divisble por 2 números: 1 y si mismo.
}

// Flecha

let esPrimo2 = numero => {
    numero = parseInt(numero);
    let contador = 0;
    for (let i = 1; i <= numero; i++) {
      if (numero % i == 0) contador++;
    }
    return contador == 2; // Divisble por 2 números: 1 y si mismo.
}


// Tests

console.log(potenciacion(2, 3));
console.log(potenciacion2(2, 3));

console.log(repetirString("Hola", 2));
console.log(repetirString2("Hola", 2));
console.log(repetirString3("Hola", 2));

console.log(esPrimo(1));
console.log(esPrimo2(1));
