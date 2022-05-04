/*
Enunciado en:
https://github.com/TheBridge-FullStackDeveloper/programacion-avanzada-kata-mayas-y-aztecas
*/

class Warrior {
    constructor(life = 0, power = 0) {
        this.life = life;
        this.power = power;
    }
    attack () {
        return this.power;
    }
    defend(damage) {
        this.life -= damage;
        return this.life;
        // return this.life > 0 ? this.life : 0;
    }
}

class Maya extends Warrior {
    constructor (life = 0, power = 0) {
        super (life, power);
    }
    drinkColaCao () {
        this.power += 10;
    }
};

class Aztec extends Warrior {
    constructor (life = 0, power = 0) {
        super (life, power);
    }
    drinkNesquik () {
        this.life += 10;
    }
};

let lifeA  = 10;
let powerA = 10;
let lifeM  = 10;
let powerM = 10;
let damage = 5;

const unAzteca = new Aztec(lifeA, powerA);
const unMaya = new Maya(lifeM, powerM);

console.log('MAYAS Y AZTECAS\n\n');

console.log('Azteca: life: ' + lifeA + ', power: ' + powerA);
console.log('Maya: life: ' + lifeM + ', power: ' + powerM);
console.log('damage: ' + damage + '\n\n');

unAzteca.drinkNesquik(); // power 0; life 10;
unMaya.drinkColaCao(); // power 10; life 0;

console.log('Bebe Nesquik Azteca: life (+10): ' + unAzteca.life + ', power: ' + unAzteca.power);
console.log('Bebe ColaCao Maya: life: ' + unMaya.life + ', power (+10): ' + unMaya.power + '\n\n');

console.log('Ataca Maya. power Maya:  ' + unMaya.attack()); // 10
console.log(`Defiende Azteca. life Azteca (-${damage}): ` + unAzteca.defend(damage)); // 5

console.log('Ataca Azteca. power Azteca: ' + unAzteca.attack()); // 0
console.log(`Defiende Maya. life Maya (-${damage}): ` + unMaya.defend(damage)); // -5