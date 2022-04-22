/*
BATERÍA DE EJERICICIOS

ARRAYS:

let personas = [
    { nombre: 'David', edad: 44, aprobado: true, nota: 7 },
    { nombre: 'Maria', edad: 30, aprobado: false, nota: 3 },
    { nombre: 'Pedro', edad: 33, aprobado: false, nota: 2 },
    { nombre: 'Marcos', edad: 25, aprobado: true, nota: 6 }
  ]
  
  - Queremos copiar nuestro array personas a otro llamado personasAprobadas donde todos estén aprobados
  - Queremos copiar a otro array aquellos alumnos que estén aprobados y tengan más de 30 años
  - Utilizando un método de array, queremos alterar nuestro array personas y que queden aprobados todas las personas.
  - Queremos guardar en una variable de tipo objeto la primera persona que tenga menos de 30 años
  
  let numeros = [ 43, 11, 18, 46, 44, 37, 42, 29, 9, 3, 37, 0, 40, 10, 38, 34, 25, 40, 4, 32 ]
  
  - Queremos guardar una copia del array incrementando en 10 el valor de cada uno de los elementos
  - Debemos borrar el primero elemento y eliminar el último guardándolo en una variable
  - Queremos guardar en un array todos los elementos pares y en otro array todos los elementos impares, debemos ordenar ambos arrays,
  después volveremos a concatenar ambos array para eliminar el tercer y cuarto elemento de este último
  */

let personasAprobadas, resultado, pares, impares;

let personas = [
    { nombre: 'David', edad: 44, aprobado: true, nota: 7 },
    { nombre: 'Maria', edad: 30, aprobado: false, nota: 3 },
    { nombre: 'Pedro', edad: 33, aprobado: false, nota: 2 },
    { nombre: 'Marcos', edad: 25, aprobado: true, nota: 6 }
];

let numeros = [ 43, 11, 18, 46, 44, 37, 42, 29, 9, 3, 37, 0, 40, 10, 38, 34, 25, 40, 4, 32 ];

personasAprobadas = personas.filter(e => e.aprobado);
console.log(personasAprobadas);

personasAprobadas = personas.filter(e => e.aprobado && e.edad >30);
console.log(personasAprobadas);

personas.forEach(e => e.aprobado = true);
console.log(personas);

resultado = personas.find(e => e.edad <30);
console.log(resultado);

resultado = numeros.map(e => e + 10);
console.log(resultado);

numeros.shift();
resultado = numeros.pop();
console.log(resultado);
console.log(numeros);

const fc = (a, b) => a - b; // Ordenación de la burbuja

pares = numeros.filter(e => e % 2 == 0).sort(fc);
console.log(pares);
impares = numeros.filter(e => e % 2 != 0).sort(fc);
console.log(impares);

resultado = pares.concat(impares).sort(fc);
console.log(resultado);

resultado = resultado.slice(0, 2).concat(resultado.slice(4));
console.log(resultado);