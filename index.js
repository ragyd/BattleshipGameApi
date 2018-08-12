const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Game = require('./src/Game.js')
//const connection = require('./database/ConnectionMSSQL.js')
const connection = require('./database/ConnectionMySQL.js')

app.get('/game',(req, res, next) => {
  Game.join(req.query.token)
  .then(game => {
      res.send(game)
    })
  .catch(error => console.error(error))
})

app.post('/game', (req, res, next) => {
  Game.create(req.body)
    .then(game => {
      res.send(game)
    })
    .catch(error => console.error(error))
})

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(3000, () => {
      console.log('Example app listening on port 3000!')      
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })