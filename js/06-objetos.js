/*
    1.- Crea un objeto de nombre Perro que tenga las propiedades: nombre, raza,
    color, edad, función ladrar (imprime por consola un ladrido)

    2.- Dado un objeto de nombre Led modifica el valor de la propiedad encendido
    por el valor false si vale true y true si vale false a través de un método.

    3.- Crea un objeto de nombre Avion que tenga las propiedades: numPasajeros,
    función despegar (imprime por consola 'despegando'), función volar (imprime
    por consola llegando al destino), función aterrizar (imprime por consola
    'aterrizando')
*/

let Perro = {
    nombre: '',
    raza: '',
    color: '',
    edad: 0,
    ladrar: function() {console.log('Guau')}
};

let Led = {
    encendido: false,
    interruptor: function() {this.encendido = !this.encendido}
};

let Avion = {
    numPasajeros: 0,
    despegar: function() {console.log('Despegando')},
    volar: function() {console.log('Llegando a destino')},
    aterrizar: function() {console.log('Aterrizando')}
};

// Tests

Perro.nombre = 'Sultan';
Perro.raza = 'Salchica';
Perro.color = 'Marrón';
Perro.edad = 5;

console.log(Perro.nombre);
console.log(Perro.raza);
console.log(Perro.color);
console.log(Perro.edad);
Perro.ladrar();

console.log(Led.encendido);
Led.interruptor();
console.log(Led.encendido);
Led.interruptor();
console.log(Led.encendido);

Avion.numPasajeros = '100',
console.log(Avion.numPasajeros);
Avion.despegar();
Avion.volar();
Avion.aterrizar();