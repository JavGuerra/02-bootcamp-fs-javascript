// Ejercicio 1
/*
https://www.codewars.com/kata/57cc975ed542d3148f00015b/train/javascript

Se le dará una matriz a y un valor x. Todo lo que necesita hacer es verificar
si la matriz proporcionada contiene el valor.
Array puede contener números o cadenas. X puede ser cualquiera.
Devuelve verdadero si la matriz contiene el valor, falso en caso contrario.
*/
const check = (a, x) => a.includes(x);

// Ejercicio 2
/*
https://www.codewars.com/kata/55eca815d0d20962e1000106/train/javascript

Implemente una función llamada generateRange(min, max, step), que toma tres
 argumentos y genera un rango de números enteros de min a max, con el paso. El
 primer entero es el valor mínimo, el segundo es el máximo del rango y el
 tercero es el paso. (mínimo <máximo)

Tarea
Implementar una función llamada
generarRange(2, 10, 2) // debe devolver una matriz de [2,4,6,8,10]
generarRange(1, 10, 3) // debe devolver una matriz de [1,4,7,10]
Nota
     min < max
     step > 0
     el rango no TIENE que incluir max (dependiendo del paso)

*/
function generateRange (min, max, step) {
    let array = [];
    for (let i = min; i < max; i += step) {
        array.push(i);
    }
    return array;
}

// Ejercicio 3
/*
https://www.codewars.com/kata/5720a1cb65a504fdff0003e2/train/javascript

En la reunión familiar anual, a la familia le gusta encontrar la edad del
miembro vivo de mayor edad y la edad del miembro de la familia más joven y
calcular la diferencia entre ellos.
Se le dará una matriz de las edades de todos los miembros de la familia, en
cualquier orden. Las edades se darán en números enteros, por lo que un bebé
de 5 meses tendrá una 'edad' asignada de 0. Devuelve una nueva matriz (una
tupla en Python) con [edad más joven, edad más antigua, diferencia entre el
más joven y el más viejo vamos].
*/

function differenceInAges(ages){

}


	  /* SOLUCIÓN UNO */
	  // En esta solución recorremos el array con for
	  // En el array auxiliar data se guardarán los datos a devolver
	  // data [0] tendrá el valor mínimo del array. Empieza con ages[0] para poder comparar con los demás
	  // data[1] tendrá el valor máximo de edad. Inicializado a 0
	  // data [2] guarda la diferencia entre el mayor y el menor. Inicializado a 0

	  const differenceInAges1 = (ages) =>{

        let data =[ages[0], 0, 0];

        for (let i = 0;i < ages.length;i++){

          // Si ages[i] es menor que el valor de la edad más pequeña, i es el nuevo valor

          if (ages[i] < data[0]) data[0] = ages[i];

          // Si ages[i] es mayor que el valor de la edad más elevada, i es el nuevo valor

          if (ages[i] > data[1]) data[1] = ages[i];

        }

        data[2] = data[1] - data[0];

        return data;

    };

    

    /* SOLUCIÓN DOS */
    // Ordenamos el array numérico de menor a mayor con el método .sort
    // Una vez ordenado podemos devolver un array cuyos contenidos serán el primer y último valor, además de la diferencia entre ambos

    const differenceInAges2 = (ages) =>{

        ages.sort((a, b) => a-b);

        return [ages[0], ages[ages.length - 1], ages[ages.length-1] - ages[0]]

    }


	  /* SOLUCIÓN TRES */
	  // Utilizando el método min y máx de Math podemos sacar ambas edades para restarlas y devolverlas.
	  // Se utiliza ... como "spread operator" que nos sirve para pasarle un array a una función que no lo acepta, como es el caso de min y max

	  const differenceInAges3 = (ages) => [Math.min(...ages), Math.max(...ages), Math.max(...ages) - Math.min(...ages)];

	  

	  /* SOLUCIÓN CUATRO */
	  // Utilizando el método min y máx de Math podemos sacar ambas edades para restarlas y devolverlas.
	  // En lugar de utilizar ... utilizamos la función apply del prototype de Function, el cual permite pasar un array a una función que no lo permita

	  const differenceInAges4 = (ages) => [Math.min.apply(null, ages), Math.max.apply(null, ages), Math.max.apply(null, ages) - Math.min.apply(null, ages)];
