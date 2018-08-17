const idHelper = require('./IdHelper.js')
const GameBd = require('.././database/GameModel.js')
const BoardBd = require('.././database/BoardModel.js')

class Game {
  constructor({cols = 10, rows = 10} = {}) {
    this.cols = cols;
    this.rows = rows;
  }

  static create({cols = 10, rows = 10} = {}) {
    const game = new Game({cols,rows});
    game.playerId = idHelper();
    const token = idHelper();
    game.token = token
    game.session = `http://localhost:3000/game?token=${token}`;
    return GameBd.sync()
    .then(() => {
      return GameBd.create({ token, playerId1 : game.playerId })
    })
    .then((gameCreated) => {
      if(gameCreated === null) {
        throw "The game could't be created in database, either could the board."
      }
      BoardBd.sync()
      .then(() => {
        BoardBd.create({
          rows,
          cols,
          gameId: gameCreated.dataValues.id
        })
      })
      gameCreated.dataValues.session = game.session
      return gameCreated.dataValues
    })
  }

  static join(token) {
    return GameBd.findOne({ where: { token } })
    .then((gameFound) => {
      if(gameFound === null) {
        throw "The link of the session doesn't exist."
      }
      const playerId2 = idHelper()
      return gameFound.update({ playerId2 })
    })
    .then(updatedGame => updatedGame.dataValues)
  }
}

module.exports = Game