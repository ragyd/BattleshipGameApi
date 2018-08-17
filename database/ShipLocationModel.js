const Sequelize  = require('sequelize');
const connection = require('.././database/ConnectionData.js')

const ShipDB = require('.././database/ShipModel.js')
const GameDB = require('.././database/GameModel.js')

const ShipLocation = connection.define('ShipLocation', {
    positionX: {
      type: Sequelize.STRING,
      field: 'position_x',
      allowNull: false
    },
    positionY: {
      type: Sequelize.INTEGER,
      field: 'position_y',
      allowNull: false
    },
    orientation: {
      type: Sequelize.CHAR(1),
      field: 'orientation',
      allowNull: false
    },
    type: {
      type: Sequelize.INTEGER,
      field: 'type',
      allowNull: false,
      references: {
        model: ShipDB,
        key: 'id'
      }
    },
    gameId: {
      type: Sequelize.INTEGER,
      field: 'game_id',
      allowNull: false,
      references: {
        model: GameDB,
        key: 'id'
      }
    },
    playerId: {
      type: Sequelize.STRING,
      field: 'player_id',
      allowNull: false
    }
  },
  {
  	timestamps: false,
  	freezeTableName: true
  });

module.exports = ShipLocation;