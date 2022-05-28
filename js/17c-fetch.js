/*
Promesas, promesas y más promesas
=================================

Dada una lista de usuarios de github guardada en una array, utiliza
'https://api.github.com/users/${name}' para obtener el nombre de cada usuario.

- Objetivo: Usar Promise.all()
- Recordatorio: Una llamada a fetch() devuelve un objeto promesa.
- Pregunta. ¿cuántas promesas tendremos?

Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

Pasos:

- Mapear el array y hacer un fetch() para cada usuario. Esto nos devuelve un array lleno de promesas.
- Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
- Cuando Promise.all() haya terminado:
    - Consigue que se imprima por consola la url del repositorio de cada usuario.
    - Consigue que se imprima por consola el nombre de cada usuario.
*/