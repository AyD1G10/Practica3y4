const mongoose = require('mongoose');
const Catalogo = require('./models/Catalogo');
const Language = require('./models/Language');
const Availability = require('./models/Availability');
const exchangeRate = require('./models/ExchangeRate');

const getCatalogo = async function () {
    const busqueda = await Catalogo.find();
    var json = busqueda;
    var json_response = {
        json: "movies",
        list: []
    };

    for (let dato of json) {

        if (dato.active== false) {
           
        } else {
            //buscar idiomas 
            var idiomas = "";
            for (let idioma of dato.languages) {
                const language = await Language.find({ id: idioma });
                // console.log(language[0].code);
                idiomas += " - " + language[0].code;
            }
            //******** */
            //console.log(idiomas);
            var item = {
                _id: dato._id,
                id: dato.id,
                name: dato.name,
                image: dato.image,
                changerate: dato.exchangeRate,
                active: dato.active,
                availabilities: dato.availabilities,
                languages: idiomas
            }
            json_response.list.push(item);
            //console.log(item);
        }
    }

    //console.log(json_response);
    return json_response;
}


const getCatalogoAdmin = async function () {
    const busqueda = await Catalogo.find();
    var json = busqueda;
    var json_response = {
        json: "movies",
        list: []
    };

    for (let dato of json) {

        //buscar idiomas 
        var idiomas = "";
        for (let idioma of dato.languages) {
            const language = await Language.find({ id: idioma });
            // console.log(language[0].code);
            idiomas += " - " + language[0].code;
        }
        //******** */
        //console.log(idiomas);
        var item = {
            _id: dato._id,
            id: dato.id,
            name: dato.name,
            image: dato.image,
            changerate: dato.exchangeRate,
            active: dato.active,
            availabilities: dato.availabilities,
            languages: idiomas
        }
        json_response.list.push(item);
        //console.log(item);
    }

    //console.log(json_response);
    return json_response;
}

const getPlanes = async function (arreglo) {

    var json_response = [];

    for(item of arreglo){
        //console.log(item);
        const ava = await Availability.find({ id: item });
        //console.log(ava[0]);
        json_response.push(ava[0]);
    }

    console.log(json_response);
    return(json_response);
}

const getTasadeCambio = async function () {
    const tasadeCambio = await exchangeRate.find();
    //console.log(tasadeCambio[0]);
    return (tasadeCambio[0]);
}

//getPlanes([1,2,3]);

module.exports = { getCatalogo , getCatalogoAdmin , getPlanes , getTasadeCambio }