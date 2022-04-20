/*
    1.- Crea la función separarPalabras que acepte como argumento un string y
    devuelva un array de palabras en mayúsuclas 'hola mundo' => [HOLA, MUNDO]
    2.- Crea una funcion que reciba una cadena de texto y un caracter, la función
    debe devolver la cadena sustituyendo por X cada vez que aparezca el caracter en
    la cadena de texto deberemos eliminar los espacios si lo hubiera y también,
    debe devolver la cadena en mayúsculas ejemplo:  cadena de texto = Mariposa
    Voladora, caracter a sustituir = a, resultado = MXRIPOSXVOLADORX
    3.- Creamos una funcion que recoja como argumento una cadena de texto y
    sustituya todas las vocales por X.
*/


cadena1 = cadena => cadena.toUpperCase().split(' ');

console.log(cadena1('Hola mundo'));



cadena2 = (cadena, caracter) => {
  return cadena.replaceAll(caracter, 'X').replaceAll(' ', '').toUpperCase();
};

console.log(cadena2('Mariposa Voladora', 'a'));



cadena3 = cadena => {
    let vocales = 'aeiou';
    for (let i = 0; i <= 4; i++) {
        if (cadena.includes(vocales[i])) {
            cadena = cadena.replaceAll(vocales[i], 'X');
        }
    }
    return cadena;
}

console.log(cadena3('Hipotenusa'));
