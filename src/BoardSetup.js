const Sequelize  = require('sequelize');

const GameBd = require('.././database/GameModel.js')
const ShipLocationBd = require('.././database/ShipLocationModel.js')
const BoardBd = require('.././database/BoardModel.js')
const ShipBd = require('.././database/ShipModel.js')

const totalShips = 5 

class BoardSetup {
  constructor({positionX = 0, positionY = 0, orientation = 'h', type = 1} = {}) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.orientation = orientation;
    this.type = type;
  }

  static create({gameId = 0, playerId = 0, boardSetup = []} = {}) {
    const gamePromise = GameBd.findOne({ where: {
        id: gameId,
        [Sequelize.Op.or]: [{ playerId1: playerId }, { playerId2: playerId }]
      }
    })
    const boardPromise = BoardBd.findOne({ where: { gameId } });
    return Promise.all([gamePromise, boardPromise])
    .then(([gameModel, boardModel]) => {
      if(gameModel === null) {
        throw "The ships could not be positioned because the Player does not exist in that game."
      }

      if(boardSetup.length !== totalShips) {
        throw "The quantity of ships is not valid. It has to be "+ totalShips +" ships."
      }

      if(boardModel === null) {
        throw "The board does not exist."
      }

      const cols = boardModel.dataValues.cols
      const rows = boardModel.dataValues.rows

      const valueIsOutsideOfBoard = boardSetup.some(ship => {
        ship.sizeShip = ship.type - 1
        if(ship.type === 1) {
          ship.sizeShip = 1
        }

        if(ship.type === 2) {
          ship.sizeShip = 2
        }

        if(ship.orientation === 'h')  {
          const colsSize = parseInt(ship.positionX + ship.sizeShip)
          return colsSize > cols || colsSize < 1 || ship.positionY > rows || ship.positionY < 1
        }
        else {
          if(ship.orientation === 'v') {
            const rowsSize = parseInt(ship.positionY + ship.sizeShip)
            return ship.positionX > cols || ship.positionX < 1 || rowsSize > rows || rowsSize < 1
          }
          else {
            throw "The orientation '" + ship.orientation + "' of the ship has to be v - vertical or h - horizontal."
          }
        }        
      })

      if(valueIsOutsideOfBoard) {
        throw "One or more ship position is outside of the board."
      }

      boardSetup.forEach(ship => {
        ship.playerId = playerId
        ship.gameId = gameId
      });

      return ShipLocationBd.destroy({ where: { playerId } })
    })
    .then(() => {
      return ShipLocationBd.bulkCreate(boardSetup)
    })
    .then(() => {
      return ShipLocationBd.findAll({ where: { playerId } })
    })
    .then(shipsLocation => {
      return shipsLocation
    })
  }
}

module.exports = BoardSetup
