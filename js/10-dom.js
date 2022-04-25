/*
PRIMER EJERCICIO DOM:
Vamos a diseñar un HTML que contenga:

- 2 elementos con identificados con un ID
- 3 elementos distintos que compartan una misma clase
- 3 elementos iguales (misma etiqueta)

Guardaremos los elementos que tienen ID En dos variables distintas, guardaremos
aquellos que compartan la misma clase en otra variable y por último guardaremos
todos aquellos elementos que sean <p> en otra.

Se debe imprimir por consola todas las variables.
*/

let variable1, variable2;
variable1 = document.getElementsByClassName("parrafo");
variable2 = document.getElementsByTagName("p");
console.log(variable1, variable2);