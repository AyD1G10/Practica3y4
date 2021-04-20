// cmd => node index.js

const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/Login', function (request, response) {
  console.log(request.body);
  return response.send(JSON.stringify({ msg: true }));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
