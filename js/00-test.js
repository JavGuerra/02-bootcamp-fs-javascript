clave = 4;
numSesion = 5;
sesion = [{'clave': 'clave'}];

localStorage.clear();
for (i = 1; i <= numSesion; i++) {
    localStorage.setItem(i, JSON.stringify(sesion));
}
localStorage.ultSesion = numSesion;

borraClave(clave);
borraClave(4);

function borraClave(clave) {
    // numSesion sesión actual;
    // sesiones num. sesiones;
    localStorage.removeItem(clave);
    let sesiones = localStorage.length - 1;

    if (sesiones) {
        localStorage.ultSesion = sesiones;

        if (numSesion == clave) {
            sesion = [];
        } else {
            ordenaClaves(clave, sesiones + 1);
            --numSesion;
        }

    console.log(numSesion, sesion);
    // historLocal();
    } else {
        numSesion = 1;
        elListado.textContent = '';
        btnHistor.disabled = true;
        btnBorrar.disabled = true;
        localStorage.removeItem('ultSesion');       
    }
}


function ordenaClaves(clave, numSesion) {
    let i, valClave;

    for (i = clave; i < (numSesion); i++) { // TODO

console.log('clave: ' + i, ' - clave+1: ' + (i+1));

        valClave = localStorage.getItem(i + 1);
        localStorage.removeItem(i + 1);
        localStorage.setItem(i, valClave);
    }
}