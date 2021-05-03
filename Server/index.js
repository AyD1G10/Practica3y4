// cmd => node index.js

const express = require('express')
const cors = require('cors');
const login = require('../Server/login.js');
var app = express();
app.use(express.json());
const port = 3000


app.use(cors());

app.get('/', (req, res) => {
  res.send('¡BlockBuster!')
})


app.post('/Login', function (request, response) {
  if (!request || !response) {
    response.send(JSON.stringify({ msg: false }));
  }
  console.log(request.body);

  if (login.Validar(request.body['usuario'], request.body['password'])) {
    return response.send(
      JSON.stringify({
        respuesta: true,
        mensaje: "",
        DataUser: [
          {
            id: 1,
            usuario: "TTGay",
            correo: "ejemplo@ejemplo.com",
            contrasena: "123",
            nombres: "Osmel David",
            apellidos: "TortolaTistok",
            dpi: 12435,
            edad: 40,
            inventario: 3,
            transacciones: 4
          }
        ],
      })
    );
  } else {
    return response.send(
      JSON.stringify({
        respuesta: false,
        mensaje: "",
        DataUser: [
          {
            id: 1,
            usuario: "TTGay",
            correo: "ejemplo@ejemplo.com",
            contrasena: "123",
            nombres: "Osmel David",
            apellidos: "TortolaTistok",
            dpi: 12435,
            edad: 40,
            inventario: 3,
            transacciones: 4
          }
        ],
      })
    );
  }
})

app.post('/catalogo', function (request, response) {
  return response.send(
    JSON.stringify({
      json: "movies",
      list: [
        {
          id: 1,
          name: "Cigueñas",
          image: "https://www.lahiguera.net/cinemania/pelicula/7422/ciguenas-cartel-7067.jpg",
          changerate: "50",
          active: "1",
          availabilities: "1",
          languages: "ENG - ESP"
        },
        {
          id: 1,
          name: "Jumanji",
          image: "https://image.tmdb.org/t/p/w1280/1uQaSgtHyTN3r2fecL0mSs6geQO.jpg",
          changerate: "75",
          active: "1",
          availabilities: "1",
          languages: "ENG - ESP - JPN"
        },
        {
          id: 1,
          name: "Sing",
          image: "https://http2.mlstatic.com/sing-ven-y-canta-benny-ibarra-pelicula-original-dvd-D_NQ_NP_940233-MLM29627339889_032019-O.jpg",
          changerate: "80",
          active: "1",
          availabilities: "1",
          languages: "ENG - ESP - JPN"
        },
        {
          id: 1,
          name: "Tarzan",
          image: "http://es.web.img3.acsta.net/pictures/14/03/17/11/47/596263.jpg",
          changerate: "100",
          active: "1",
          availabilities: "1",
          languages: "ENG - ESP - JPN"
        },
        {
          id: 1,
          name: "Coco",
          image: "https://image.tmdb.org/t/p/original/98G7zRNJBGuJiJmWcCTv0whXltA.jpg",
          changerate: "175",
          active: "1",
          availabilities: "1",
          languages: "ENG - ESP - JPN"
        },
        {
          id: 1,
          name: "Spiderman",
          image: "https://http2.mlstatic.com/poster-originales-de-peliculas-de-cine-D_NQ_NP_100325-MLM25403772463_022017-F.jpg",
          changerate: "75",
          active: "1",
          availabilities: "1",
          languages: "ENG - ESP"
        },
        {
          id: 1,
          name: "Jurassic World",
          image: "https://www.carlosvillarin.com/wp-content/uploads/cartel-jurassic-world-1-carlos-villarin-freelance.jpg",
          changerate: "55",
          active: "1",
          availabilities: "1",
          languages: "ENG - ESP"
        }
      ]

    })
  )
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

module.exports = app;
