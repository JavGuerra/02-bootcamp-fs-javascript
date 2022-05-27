const url = 'https://dog.ceo/api/';
const gal = 'breed/dachshund/images';

function consultaAPI(ruta, hacer) {
    fetch(ruta)
    .then(resp => {
        if (!resp.ok) throw Error(resp.status);
        return resp;
    })
    .then(resp => resp.json())
    .then(data => hacer(data))
    .catch(err => alert(err))
}

let hacer = data => {
    data.message.forEach(foto => {console.log(foto)});

    console.log('otra cosa');
};

consultaAPI(url + gal, hacer);