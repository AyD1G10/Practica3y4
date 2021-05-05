const mongoose = require('mongoose');
const Catalogo = require('./models/Catalogo');
const Language = require('./models/Language');

const  getCatalogo = async function(){
    const busqueda = await Catalogo.find();
    var json = busqueda;
    var json_response={
        json: "movies",
        list: []
    };

    for (let dato of json) {
        
        //buscar idiomas 
        var idiomas="";
        for(let idioma of dato.languages){
            const language = await Language.find({id:idioma});
           // console.log(language[0].code);
            idiomas+=" - " + language[0].code;
        }
        //******** */
        //console.log(idiomas);
        var item ={
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

//getCatalogo();

module.exports = { getCatalogo }