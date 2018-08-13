const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Game = require('./src/Game.js')
const ShipPosition = require('./src/ShipPosition.js')
const connection = require('./database/ConnectionMSSQL.js')
const ShipTypeBd = require('./database/ShipModel.js')

app.get('/game',(req, res, next) => {
  Game.join(req.query.token)
  .then(game => {
      res.send(game)
    })
  .catch(error => {
   console.error(error)
     res.status(400).send({
         message: error
    })
  })
})

app.post('/game', (req, res, next) => {
  Game.create(req.body)
  .then(game => {
    res.send(game)
  })
  .catch(error => {
   console.error(error)
     res.status(400).send({
         message: error
    })
  })
})


app.put('/game/:gameId/player/:playerId/board', (req, res, next) => {
  const gameId = req.params.gameId;
  const playerId = req.params.playerId;
  const shipPositions = req.body;  
  ShipPosition.create({gameId, playerId, shipPositions})
  .then(shipPosition => {
    res.send(shipPosition)
  })
  .catch(error => {
   console.error(error)
     res.status(400).send({
         message: error
    })
  })
})

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(3000, () => {
      console.log('Example app listening on port 3000!')      
    })
    ShipTypeBd.sync()
    .then(() => {
      ShipTypeBd.count().then(count => {
        if(count === 0)
        ShipTypeBd.bulkCreate([
          { id: 1, name: 'Destroyer', size: 2 },
          { id: 2, name: 'Submarine', size: 3 },
          { id: 3, name: 'Cruiser', size: 3 },
          { id: 4, name: 'Battleship', size: 4 },
          { id: 5, name: 'Carrier', size: 5 }
        ])
      })
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })