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

const Usuario = require('./models/Usuarios');


const mongodbURL = "mongodb+srv://adminsopes1p1:adminsopes1p1@cluster0.c9orq.mongodb.net/Blockbusted?retryWrites=true&w=majority";
mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log('DB is conencted to', db.connection.host))
  .catch(err => { console.log("###################ESTE SERIA EL ERROR#######################"); console.error(err); });

app.use(cors());

app.get('/', (req, res) => {
  res.send('¡BlockBuster!')
})


app.post('/Login', function (request, response) {
  if (!request || !response) {
    response.send(JSON.stringify({ msg: false }));
  }
  console.log(request.body);


  Usuario.find({ username: request.body['usuario'], password: request.body['password'] })
    .exec()
    .then(doc => {
      console.log("-> "+doc);
      response.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({ error: err });
    });
});

app.post('/transaccion', async (request, response) => {
  console.log(request.body); 

  const transa = new Transacciones({
    _id: new mongoose.Types.ObjectId(),
    user: request.body['user'],
    key: request.body['key'], 
    movieid : request.body['movieid'],
    plan : request.body['plan'], 
    exchangeRate :  7,
    total : request.body['total'],
    date : new Date()

  })
  transa.save()
  .then(result => {
    console.log(result);
    response.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    response.status(500).json({ error: err });
  });

})


app.post('/SignUp', function (request, response) {
  if (!request || !response) {
    response.send(JSON.stringify({ msg: false }));
  }
  console.log(request.body);

  const usuario = new Usuario({
    _id: new mongoose.Types.ObjectId(),
    name: request.body['name'],
    lastname:request.body['lastname'],
    username:request.body['username'],
    email:request.body['email'],
    password:request.body['password'],
    dpi:request.body['dpi'],
    age:request.body['age'],
    creditCard:request.body['creditCard'],
    type:request.body['type']
  });

  usuario.save()
    .then(result => {
      console.log(result);
      response.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({ error: err });
    });

});

app.post('/detallesPelicula', function (request, response) {
  if (!request || !response) {
    response.send(JSON.stringify({ msg: false }));
  }
  console.log(request.body);

  Catalogo.find({ _id: request.body['id'] })
    .exec()
    .then(doc => {
      console.log(doc);
      response.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({ error: err });
    });

});


app.get('/test', function (request, response) {
  console.log(request.body);

  Catalogo.find()
    .exec()
    .then(doc => {
      console.log(doc);
      response.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({ error: err });
    });

});

app.post('/getTasa', async (request, response) => {
  //actualizar bd
  await consumirApi.getExchangeRate();

  let json_response = await obtenerCatalogo.getTasadeCambio();
  //console.log(json_response);
  response.json(json_response);
})

app.post('/catalogo', async (request, response) => {
    let json_response = await obtenerCatalogo.getCatalogo();
  //console.log(json_response);
    response.json(json_response);
})

app.post('/catalogoadmin', async (request, response) => {
  let json_response = await obtenerCatalogo.getCatalogoAdmin();
//console.log(json_response);
  response.json(json_response);
})

app.post('/planes', async (request, response) => {
  //console.log(request.body["availabilities"]);
  let json_response = await obtenerCatalogo.getPlanes(request.body["availabilities"]);
  //console.log(json_response);
  response.json(json_response);
})


 
app.post('/record', async (req, res) => {
  const userId = req.body.userId;
  const transactionList = await Transacciones.find({user:userId});

  //console.log(transacciones)

  /*const userHistory = usuario[0].History;
  transactionList = [];
  const filterHistory = async function () {
    for (let i = 0; i < userHistory.length; i++) {
      let transactionId = userHistory[i];
      let result = await Transacciones.find({ _id: String(transactionId) })
      transactionList.push(result[0])
    }

  }*/
  //await filterHistory();

  let MovieList = []
  const getMovie = async function () {
    for (let i = 0; i < transactionList.length; i++) {
      
      let transactionElement = transactionList[i];
      let transac = { transactionElement };

     /* let movieId = transactionList[i].movieid;
      let result = await Catalogo.find({ _id: String(movieId) })
      transac.movie = result[0];*/

      let movieId = transactionList[i].movieid;
        let movieList = [];
        for (const oneMovie of movieId) {
          let result = await Catalogo.find({ _id: String(oneMovie) })
          movieList.push(result[0]);
        }
        
        transac.movie = movieList;

      /*let planid = transactionList[i].plan;
      let resultPlan = await Availability.find({ _id: String(planid) })
      transac.plan = resultPlan[0]*/

      let planid = transactionList[i].plan;
      let planList = [];
      for (const onePlan of planid) {
          let resultPlan = await Availability.find({ id: onePlan })
          planList.push(resultPlan[0]);
      }
        
      transac.plan = planList

      MovieList.push(transac)
    }

  }
  await getMovie();



  res.json({ result: MovieList })
})

app.post('/adminRecord',async (req,res) => {
  //const userId = req.body.userId;
  //const usuario = await Usuarios.find({ _id: userId });
  
  const transacciones = await Transacciones.find({});
  if(transacciones.length > 0) {

    let Records = [];
    const getMovie = async function () {
      for (let i = 0; i < transacciones.length; i++) {
        
        let transactionId = transacciones[i]._id;
        let userId = transacciones[i].user;

        let userObj = await Usuario.find({_id: userId});

        /*let userObj = usuarios.filter(element => {
          let arrayHistory = element.History
          if(arrayHistory.length > 0) {
            for (const iterator of arrayHistory) {
              if(String(iterator) == String(transactionId)) {
                return element;
              }
            }
          }
        })*/
        
        let transactionElement = transacciones[i];
        let transac = { transactionElement };
        transac.user = userObj;

        let movieId = transacciones[i].movieid;
        let movieList = [];
        for (const oneMovie of movieId) {
          let result = await Catalogo.find({ _id: String(oneMovie) })
          movieList.push(result[0]);
        }
        
        transac.movie = movieList;
        
  
        let planid = transacciones[i].plan;
        let planList = [];
        //console.log(planid)
        for (const onePlan of planid) {
          let resultPlan = await Availability.find({ id: onePlan })
          planList.push(resultPlan[0]);
        }
        
        transac.plan = planList
  
        Records.push(transac)
      }

    }

    await getMovie();
    res.json({ result: Records });
  } else {
      res.json({ result: [] });
  }

  //
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

module.exports = app;
