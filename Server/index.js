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
        mensaje:"",
        DataUser:[
        {
          id:1,
          usuario: "TTGay",
          correo:"ejemplo@ejemplo.com",
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
        mensaje:"",
        DataUser:[
        {
        id:1,
        usuario: "TTGay",
        correo:"ejemplo@ejemplo.com",
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

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

module.exports = app;
