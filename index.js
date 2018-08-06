const express = require('express');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Game = require('./src/game.js')

app.get('/game',(req, res) => {
  Game.join(req.query.token)
  .then(game => {
      res.send(game)
    })
  .catch(error => console.error(error))
})

app.post('/game', (req, res) => {
  Game.create(req.body)
    .then(game => {
      res.send(game)
    })
    .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})


/*
  POST /game
  {
    "rows":
    "columns"
  }

  {
    "gameId": "http://localhost:3000/game?token=asdfasdfw23",
    "playerId": "asdfasdfasdf"
  }
*/

//folders: game-service
//files: GameService.js
