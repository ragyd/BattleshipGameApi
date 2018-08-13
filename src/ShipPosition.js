const Sequelize  = require('sequelize');
const GameBd = require('.././database/GameModel.js')
const PositionShipBd = require('.././database/PositionShip.js')
const BoardBd = require('.././database/BoardModel.js')

const valueMaxOfShips = 6

class ShipPosition {
  constructor({positionX = 0, positionY = 0, orientation = 'h', type = 1} = {}) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.orientation = orientation;
    this.type = type;
  }

  static create({gameId = 0, playerId = 0, shipPositions = []} = {}) {
    return GameBd.findOne({ where: 
      Sequelize.or({ playerId1: playerId }, { playerId2: playerId })
    })
    .then((gameModel) => {
      if(gameModel === null) {
        return "The ships could not be positioned because the Player does not exist."
      }
      if(shipPositions.length !== valueMaxOfShips) {
        return "The quantity of ships is not valid. It has to be 6 ships."
      }
      return BoardBd.findOne({ where: { gameId } }) 
      .then((boardModel) => {
        if(boardModel === null) {
          return "The board does not exist."
        }
        const cols = boardModel.dataValues.cols - 1
        const rows = boardModel.dataValues.rows - 1

        const valueIsBiggerThanBoard = shipPositions.some(ship => {
          return ship.positionX > cols || ship.positionY > rows
        });

        if(valueIsBiggerThanBoard) {
          return "One or more ship position is outside of the board."
        }

        shipPositions.forEach(ship => {
          ship.playerId = playerId
          ship.gameId = gameId
        });

        PositionShipBd.sync()
        PositionShipBd.bulkCreate(shipPositions)
        return `The ships were positioned in the board.`
      })
    })
    .catch(error => {
      console.log(error)
      return "There is an internal problem."
    })
  }
}
module.exports = ShipPosition

/*
JSON:
[
  {
    "positionX":1,
    "positionY":1,
    "orientation": "v",
    "type": 1
  },
  {
    "positionX":2,
    "positionY":2,
    "orientation": "h",
    "type": 2
  },
  {
    "positionX":2,
    "positionY":2,
    "orientation": "h",
    "type": 2
  },
  {
    "positionX":1,
    "positionY":1,
    "orientation": "v",
    "type": 1
  },
  {
    "positionX":2,
    "positionY":2,
    "orientation": "h",
    "type": 2
  },
  {
    "positionX":2,
    "positionY":2,
    "orientation": "h",
    "type": 2
  }  
]
*/
