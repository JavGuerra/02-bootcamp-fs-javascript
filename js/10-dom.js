/*
PRIMER EJERCICIO DOM:
Vamos a diseñar un HTML que contenga:

- 2 elementos con identificados con un ID
- 3 elementos distintos que compartan una misma clase
- 3 elementos iguales (misma etiqueta)

- Guardaremos los elementos que tienen ID en dos variables distintas.
- Guardaremos aquellos que compartan la misma clase en otra variable.
- Y por último guardaremos todos aquellos elementos que sean <p> en otra.

Se deben imprimir por consola todas las variables.
*/

let variable1, variable2, variable3, variable4;
variable1 = document.getElementById("uno");
variable2 = document.getElementById("dos");
variable3 = document.getElementsByClassName("parrafo");
variable4 = document.getElementsByTagName("p");
console.log(variable1, variable2, variable3, variable4);

console.log(variable1);
console.log(variable2);
console.log(variable3);
console.log(variable4);