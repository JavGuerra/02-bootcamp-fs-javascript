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

import { initFirebase } from './initFirebase.js'; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut }
  from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js';
import { getDatabase, ref, get, set, child }
  from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js';

const app  = initFirebase();
const auth = getAuth(app);
const db   = getDatabase(app);

onAuthStateChanged(auth, (user) => {

  if (user) {

    showEl(el('#login'), false);
    showEl(el('#alta' ), false);
    showEl(el('#datos'), true );

    // getUserData(db, userId);

  } else {

    let mode = false;
    showEl(el('#datos'), false);
    switchMode();

    el('#envLogin').onclick = (e) => loginUser(e, auth, db);
    el('#envAlta' ).onclick = (e) => signUpUser(e, auth, db);
    el('#envSalir').onclick = (e) => logoutUser(e, auth);
    el('#lnkLogin').onclick = switchMode;
    el('#lnkAlta' ).onclick = switchMode;


    function loginUser(e, auth, db) {
      if (document.formLogin.checkValidity()) {
        e.preventDefault();

        const correo = document.formLogin.correo.value;
        const passwd = document.formLogin.passwd.value;
        
        signInWithEmailAndPassword(auth, correo, passwd)
          .then(response => {

            console.log('Usuario autenticado correctamente.');
            const userId = response.user.uid;

            // TODO Mostrar datos
            // getUserData(db, userId);
            
            showEl(el('#login'), false);
            showEl(el('#datos'), true);
          })
          .catch(error => alert(error.code, error.message));
      }
    }


    function signUpUser(e, auth, db) {
      if (document.formAlta.checkValidity()) {
        e.preventDefault();

        const nombre  = document.formAlta.nombre.value;
        const edad    = document.formAlta.edad.value;
        const direcc  = document.formAlta.direccion.value;
        const correo  = document.formAlta.correo2.value;
        const passwd  = document.formAlta.passwd1.value;
        const passwd2 = document.formAlta.passwd2.value;

        if (passwd !== '' && passwd2 !== '' && passwd === passwd2) {
          createUserWithEmailAndPassword(auth, correo, passwd)
            .then(response => {
              console.log('Usuario creado correctamente.');
              const userId = response.user.uid;
              const data = {
                nombre: nombre,
                edad: edad,
                direcc: direcc,
                correo: correo
              };

              // TODO subir datos
              // setUserData(db, userId, data);

              switchMode();
            })
            .catch(error => alert(error.code, error.message));
        } else {
          alert('Las contraseñas no coinciden.');
        }
      }
    }


    function logoutUser(e, auth) {
      e.preventDefault();

      signOut(auth)
        .then(() => {
          console.log('Cerrada sesión de usuario correctamente.');
          showEl(el('#datos'), false);
          showEl(el('#login'), true);
        })
        .catch(error => alert(error.code, error.message));
    }


    function getUserData(db, userId) {
      get(child(ref(db), `users/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log('Datos de usuario obtenidos correctamente.');
            el('#dataNombre').innerHTML = snapshot.val().nombre;
            el('#datoEdad'  ).innerHTML = snapshot.val().edad;
            el('#datoDirec' ).innerHTML = snapshot.val().direcc;
            el('#datoCorreo').innerHTML = snapshot.val().correo;
          } else {
            console.log("No hay datos disponibles.");
          }
        })
        .catch(error => alert(error.code, error.message));
    }


    function setUserData(db, userId, data) {
      try {
        set(ref(db, `users/${userId}`), data);
      }
      catch (error) {alert(error.code, error.message)};
    }


    function el(el) { return document.querySelector(el) }


    function showEl(el, status) { el.style.display = status ? 'initial' : 'none' }


    function switchMode() {
      mode = !mode;
      showEl(el('#login'), mode);
      showEl(el('#alta'), !mode);
    }

  }

});