// cmd => node index.js

const express = require('express')
const cors = require('cors');
const login = require('../Server/login.js');
const consumirApi = require('./consumirApi.js');
const obtenerCatalogo =  require('./catalogo');
var app = express();
app.use(express.json());
const port = 3000
const mongoose = require('mongoose');
const Transacciones = require('./models/Transacciones');
const Usuarios = require('./models/Usuarios');
const Catalogo =  require('./models/Catalogo');
const Availability = require('./models/Availability');

const mongodbURL = "mongodb+srv://adminsopes1p1:adminsopes1p1@cluster0.c9orq.mongodb.net/Blockbusted?retryWrites=true&w=majority";
mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(db => console.log('DB is conencted to', db.connection.host))
	.catch(err => {console.log("###################ESTE SERIA EL ERROR#######################"); console.error(err);});

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

app.post('/catalogo', async (request, response) => {
    let json_response = await obtenerCatalogo.getCatalogo();
  //console.log(json_response);
    response.json(json_response);
})

app.post('/record',async (req,res) => {
  const userId = req.body.userId;
  const usuario = await Usuarios.find({_id:userId});
  const transacciones = await Transacciones.find({});

  //console.log(transacciones)

  const userHistory = usuario[0].History;
  transactionList = [];
  const filterHistory = async function() {
    for(let i=0;i<userHistory.length;i++) {
      let transactionId = userHistory[i];
      let result = await Transacciones.find({_id:String(transactionId)})
      transactionList.push(result[0])
    }
    
  }
  await filterHistory();

  let MovieList = []
  const getMovie = async function() {
    for(let i=0;i<transactionList.length;i++) {

      let movieId = transactionList[i].movieid;
      let result = await Catalogo.find({_id:String(movieId)})
      let transactionElement = transactionList[i];
      let transac = {transactionElement};
      
      transac.movie = result[0];
     
      let planid = transactionList[i].plan;
      let resultPlan = await Availability.find({_id:String(planid)})
      transac.plan = resultPlan[0]

      MovieList.push(transac)
    }
    
  }
  await getMovie();
  
  

  res.json({result:MovieList})
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

module.exports = app;
