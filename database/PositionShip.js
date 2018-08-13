const Sequelize  = require('sequelize');
//const connection = require('.././database/ConnectionMSSQL.js')
const connection = require('.././database/ConnectionMySQL.js')
const ShipDB = require('.././database/ShipModel.js')
const GameDB = require('.././database/GameModel.js')

const PositionShip = connection.define('PositionShip', {
    positionX: {
      type: Sequelize.STRING,
      field: 'position_x'
    },
    positionY: {
      type: Sequelize.INTEGER,
      field: 'position_y'
    },
    orientation: {
      type: Sequelize.CHAR,
      field: 'orientation'
    },
    type: {
      type: Sequelize.INTEGER,
      field: 'type',
      references: {
        model: ShipDB,
        key: 'id'
      }
    },
    gameId: {
      type: Sequelize.INTEGER,
      field: 'game_id',
      references: {
        model: GameDB,
        key: 'id'
      }
    },
    playerId: {
      type: Sequelize.STRING,
      field: 'player_id'
    }
  },
  {
  	timestamps: false,
  	freezeTableName: true
  });

module.exports = PositionShip;