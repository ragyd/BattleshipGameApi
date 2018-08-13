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
    .then((gameModel) => {
      if(gameModel === null) {
        throw "The game could't be created in database, either could the board."
      }
      BoardBd.sync()
      .then(() => {
        BoardBd.create({
          rows,
          cols,
          gameId: gameModel.dataValues.id
        })
      })
      gameModel.dataValues.session = game.session
      return gameModel.dataValues
    })
  }

  static join(token) {
    return GameBd.findOne({ where: { token } })
    .then((gameModel) => {
      if(gameModel === null) {
        throw "The link of the session doesn't exist."
      }
      const playerId2 = idHelper()
      return GameBd.sync()
    })
    .then(() => {
      return GameBd.update({ playerId2 }, { where: { token } })
    })    
  }
}

module.exports = Game
