var Request = require("request");

const mongoose = require('mongoose');
const Catalogo = require('./models/Catalogo');
const Availability = require('./models/Availability');
const Language = require("./models/Language");
const ExchangeRate = require("./models/ExchangeRate");

/*const mongodbURL = "mongodb+srv://adminsopes1p1:adminsopes1p1@cluster0.c9orq.mongodb.net/Blockbusted?retryWrites=true&w=majority";
mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB is conencted to', db.connection.host))
    .catch(err => { console.log("###################ESTE SERIA EL ERROR#######################"); console.error(err); });
*/

function getApiMovies() {
    Request.get("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Movie", (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        var json = JSON.parse(body);
        for (let dato of json) {

            var available = []
            for (let item of dato.availabilities) {
                available.push(item);
            }
            var lenguajes = []
            for (let item of dato.languages) {
                lenguajes.push(item);
            }

            const movie = new Catalogo({
                _id: new mongoose.Types.ObjectId(),
                id: dato.id,
                name: dato.name,
                image: dato.image,
                exchangeRate: dato.chargeRate,
                active: dato.active,
                availabilities: available,
                languages: lenguajes
            });

            movie.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => console.log(err));

            console.log(movie);
        }
    });
}

function getApiAvialabity() {
    Request.get("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Availability", (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        var json = JSON.parse(body);
        for (let dato of json) {

            const availability = new Availability({
                _id: new mongoose.Types.ObjectId(),
                id: dato.id,
                name: dato.name,
                serviceDays: dato.serviceDays,
                bonusDays: dato.bonusDays,
                fine: dato.fine,
            });
            //console.log(availability);
            availability.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => console.log(err));
        }

    });
}

function getLenguage() {

    Request.get("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Language", (error, response, body) => {
        if (error) {
            return console.dir(error);
        }

        var json = JSON.parse(body);
        for (let dato of json) {

            const language = new Language({
                _id: new mongoose.Types.ObjectId(),
                id: dato.id,
                code: dato.Code,
                description: dato.Description,
            });
            //console.log(language);
            language.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => console.log(err));
        }


    });
}

const getExchangeRate = async function () {

    const tasadeCambio = await ExchangeRate.find();

    var dato_api;
    Request.get("https://my-json-server.typicode.com/CoffeePaw/AyD1API/ExchangeRate", async (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        var json = JSON.parse(body);

        for (let dato of json) {
            dato_api = dato.total;
            mongoose.set('useFindAndModify', false);
            await ExchangeRate.findOneAndUpdate(
                {
                    _id: tasadeCambio[0]._id
                },
                {
                    total: dato_api
                }
            );
        }
        //console.log(dato_api);
    });
}

const updateMovies = async function () {
    Request.get("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Movie", async (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        var json = JSON.parse(body);
        for (let dato of json) {
            const movie = await Catalogo.find({ name: dato.name })

            if (movie[0] != undefined) {
                mongoose.set('useFindAndModify', false);
                await Catalogo.findOneAndUpdate(
                    {
                        name: dato.name
                    },
                    {
                        exchangeRate: dato.chargeRate,
                        active: dato.active,
                    });
            } else {
                //agregar pelicula
                var available = []
                for (let item of dato.availabilities) {
                    available.push(item);
                }
                var lenguajes = []
                for (let item of dato.languages) {
                    lenguajes.push(item);
                }

                const movie = new Catalogo({
                    _id: new mongoose.Types.ObjectId(),
                    id: dato.id,
                    name: dato.name,
                    image: dato.image,
                    exchangeRate: dato.chargeRate,
                    active: dato.active,
                    availabilities: available,
                    languages: lenguajes
                });

                movie.save()
                    .then(result => {
                        console.log(result);
                    })
                    .catch(err => console.log(err));
            }
        }

        //actualizar para no mostrar 
        const movie = await Catalogo.find();
        var bandera = false;
        for (let valor of movie) {
            // console.log(movie);
            for (let dato of json) {
                if (valor.name == dato.name) {
                    //console.log("lo encontro " + valor.name);
                    bandera = true;
                }
            }
            if (bandera == false) {
                //console.log("desactivas " + valor.name);
                
                await Catalogo.findOneAndUpdate(
                    {
                        name: valor.name
                    },
                    {
                        active: false,
                    });
            }
            bandera = false;
        }
    });
}

//getLenguage();
//getApiMovies();
//getApiAvialabity();
//getExchangeRate();
//updateMovies();
module.exports = { getExchangeRate, getLenguage, getApiAvialabity, getApiMovies, getExchangeRate, updateMovies }