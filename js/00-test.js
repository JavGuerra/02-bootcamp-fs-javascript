const promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.floor(Math.random() * (11 - 0)) + 0;
      //num > 5 ? resolve('Mayor que 5') : reject('Menor que 5');
      if( num > 5) {
        resolve('Mayor que 5')
      } else {
        reject('Menor que 5')
      }
    }, 10000);
  });
  
  promesa
    .then(response => console.log('Exito : '+response))
    .catch(response => console.log('Ha fallado la promesa : '+response))
    .finally(() => console.log('Se ha procesado la promesa'));
  
  console.log('Llegamos aqui.....')