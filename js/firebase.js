/*
Enunciado Autenticación Firebase
================================
Queremos añadir un desarrollo a nuestra app, que permita la siguiente funcionalidad:
- Lo primero que tendrá que aparecer será un login donde me pedirá correo y contraseña,
también tendrá la opción de llevarme al formulario de registro.
- El formulario de registro, deberá contemplar los siguiente datos:
  nombre, edad, dirección, email, contraseña y otro campo para confirmar la contraseña.
- En caso de dar de alta el usuario correctamente debemos:
	- Dar de alta en nuestra base de datos al usuario con sus campos (nombre, edad,...) [PARA EL FINAL]
	- Mandar al usuario de vuelta al login
  - Una vez logueado, deberíamos mostrar un mensaje personalizado al usuario con sus datos
  que anteriormente guardamos en la BBDD [PARA EL FINAL]
- Debemos permitir al usuario salir del juego y volver al login
*/

import { initializeApp }
  from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut}
  from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js';
import { getDatabase, ref, get, set, child }
  from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDaF-45rWqh8YLLUe--EwoYLRiEe2Px0B0',
  authDomain: 'summer-quiz-e02fd.firebaseapp.com',
  databaseURL:
    'https://summer-quiz-e02fd-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'summer-quiz-e02fd',
  storageBucket: 'summer-quiz-e02fd.appspot.com',
  messagingSenderId: '163068474160',
  appId: '1:163068474160:web:c5db0935ac758fa6c4cef5',
};

const app = initializeApp(firebaseConfig);

let mode = false;
showEl(el('#datos'), false);
switchMode();

el('#envLogin').onclick = (e, app) => loginUser(e, app);
el('#envAlta' ).onclick = (e, app) => signUpUser(e, app);
el('#envSalir').onclick = (e, app) => logoutUser(e, app);
el('#lnkLogin').onclick = switchMode;
el('#lnkAlta' ).onclick = switchMode;


function loginUser(e, app) {
  if (document.formLogin.checkValidity()) {
    e.preventDefault();

    const auth   = getAuth(app);
    const correo = document.formLogin.correo.value;
    const passwd = document.formLogin.passwd.value;
    
    signInWithEmailAndPassword(auth, correo, passwd)
      .then(response => {

        console.log('Usuario autenticado correctamente.', response);
        const user = response.user;

        // TODO Mostrar datos con getUserData(app, userId) ¿async/await?
        
        showEl(el('#login'), false);
        showEl(el('#datos'), true);
        console.log(user);

      })
      .catch(error => alert(error.code, error.message));
  }
}


function signUpUser(e, app) {
  if (document.formAlta.checkValidity()) {
    e.preventDefault();

    const auth    = getAuth(app);
    const nombre  = document.formAlta.nombre.value;
    const edad    = document.formAlta.edad.value;
    const direcc  = document.formAlta.direccion.value;
    const correo  = document.formAlta.correo2.value;
    const passwd  = document.formAlta.passwd1.value;
    const passwd2 = document.formAlta.passwd2.value;

    if (passwd !== '' && passwd2 !== '' && passwd === passwd2) {
      createUserWithEmailAndPassword(auth, correo, passwd)
        .then(response => {

          console.log('Usuario creado correctamente.', response);
          const user = response.user;

          // TODO subir datos con setUserData(app, userId, data)

          switchMode();

        })
        .catch(error => alert(error.code, error.message));
    } else {
      alert('Las contraseñas no coinciden.');
    }
  }
}


function logoutUser(e, app) {
  e.preventDefault();

  const auth = getAuth(app);

  signOut(auth)
    .then(() => {
      console.log('Cerrada sesión de usuario correctamente.');
      showEl(el('#datos'), false);
      showEl(el('#login'), true);
    })
    .catch(error => alert(error.code, error.message));
}


function getUserData(app, userId) {
  const dbRef = ref(getDatabase(app));
  get(child(dbRef, `users/${userId}`))
  .then((snapshot) => {
    if (snapshot.exists()) {

      console.log(snapshot.val());
      // TODO

    } else {
      console.log("No data available");
    }
  })
  .catch(error => alert(error.code, error.message));
}


function setUserData(app, userId, data) {
  const db = getDatabase(app);
  set(ref(db, `users/${userId}`), {
    nombre: data.nombre,
    edad: data.edad,
    direcc: data.direcc
  });
}


function el(el) { return document.querySelector(el) }


function showEl(el, status) { el.style.display = status ? 'initial' : 'none' }


function switchMode() {
  mode = !mode;
  showEl(el('#login'), mode);
  showEl(el('#alta'), !mode);
}
