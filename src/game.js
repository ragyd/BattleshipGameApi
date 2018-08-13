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
      .then(() => {
        return GameBd.findOne({ where: { token } })
      })
      .then((gameModel) => {
      if(gameModel === null) {
        return "The game could't be created in database, either could the board."
      }
        BoardBd.sync()
          BoardBd.create({
            rows,
            cols,
            gameId: gameModel.dataValues.id
          })
        return `The game and board were created. Use this link to invite another player to join: 
          <a href="${game.session}>" ${game.session}</a>`
      })
      .catch(error => {
        console.log(error)
        return "The game could't be created"
      })
  }

  static join(token) {
    return GameBd.sync()
      .then(() => {
        return GameBd.findOne({ where: { token } })
      })
      .then((gameModel) => {
      if(gameModel === null) {
        return "The link of the session doesn't exist."
      }      
      GameBd.update(
        { playerId2: idHelper() }, 
        { where: { token } })
      return gameModel.dataValues
    })
  }
}

module.exports = Game
