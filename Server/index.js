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
        id: 1,
        nombre: "nombre",
        apellido: "apellido"
      })
    );
  } else {
    return response.send(
      JSON.stringify({
        respuesta: false,
        mensaje: "Usuario no existe",
        id: -1,
        nombre: "",
        apellido: ""
      })
    );
  }
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

module.exports = app;
