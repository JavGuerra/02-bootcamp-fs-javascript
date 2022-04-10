/*
Calculadora que recibe dos valores sin pedir a usuario.
4 variables, num1 y num2, calculo y resultado
usar switch, 
1 sumar
2 restar
3 dividir
4 multiplicar

Nota: No controla división por cero
*/

let numero1, numero2, calculo, resultado;

numero1 = 5;
numero2 = 2;
calculo = "dividir";

switch (calculo) {
  case "sumar":
    resultado = numero1 + numero2;
    break;
  case "restar":
    resultado = numero1 - numero2;
    break;
  case "multiplicar":
    resultado = numero1 * numero2;
    break;
  case "dividir":
    resultado = numero1 / numero2;
    break;
  default:
    resultado = null;
}

if (resultado === null) {
  console.error("Error: operación desconocida");
} else {
  console.log("El resultado de " + calculo + " es: " + resultado);
}
