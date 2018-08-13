const Sequelize  = require('sequelize');

const GameBd = require('.././database/GameModel.js')
const PositionShipBd = require('.././database/PositionShip.js')
const BoardBd = require('.././database/BoardModel.js')
const ShipBd = require('.././database/ShipModel.js')

const quantityOfShips = 6

class ShipPosition {
  constructor({positionX = 0, positionY = 0, orientation = 'h', type = 1} = {}) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.orientation = orientation;
    this.type = type;
  }

  static create({gameId = 0, playerId = 0, shipPositions = []} = {}) {
    return GameBd.findOne({ where: {
      id: gameId,
      [Sequelize.Op.or]: [{ playerId1: playerId }, { playerId2: playerId }]
    }
    })
    .then((gameModel) => {
      if(gameModel === null) {
        throw "The ships could not be positioned because the Player does not exist in that game."
      }

      if(shipPositions.length !== quantityOfShips) {
        throw "The quantity of ships is not valid. It has to be 6 ships."
      }

      return BoardBd.findOne({ where: { gameId } })
      .then((boardModel) => {
        if(boardModel === null) {
          throw "The board does not exist."
        }

        const cols = boardModel.dataValues.cols - 1
        const rows = boardModel.dataValues.rows - 1

        const valueIsOutsideOfBoard = shipPositions.some(ship => {
          ship.sizeShip = ship.type - 1
          if(ship.type === 1) {
            ship.sizeShip = 1
          }

          if(ship.type === 2) {
            ship.sizeShip = 2
          }

          if(ship.orientation === 'h')  {
            return parseInt(ship.positionX + ship.sizeShip) > cols || ship.positionY > rows
          }

          return ship.positionX > cols || parseInt(ship.positionY + ship.sizeShip) > rows          
        })

        if(valueIsOutsideOfBoard) {
          throw "One or more ship position is outside of the board."
        }

        shipPositions.forEach(ship => {
          ship.playerId = playerId
          ship.gameId = gameId
        });

        PositionShipBd.sync()
        .then(() => {
          PositionShipBd.bulkCreate(shipPositions)
        })
        return "The ships were positioned in the board."
      })
    })
  }
}

module.exports = ShipPosition