const Sequelize  = require('sequelize');
const connection = require('.././database/ConnectionMSSQL.js')

const GameDB = require('.././database/GameModel.js')

const Board = connection.define('Board', {
    gameId: {
      type: Sequelize.INTEGER,
      field: 'game_id',
      allowNull: false,
      references: {
        model: GameDB,
        key: 'id'
      }
    },
    cols: {
      type: Sequelize.INTEGER,
      field: 'cols',
      allowNull: false,
      validate: { min: 10, max: 30 }
    },
    rows: {
      type: Sequelize.INTEGER,
      field: 'rows',
      allowNull: false,
      validate: { min: 10, max: 30 }
    }
  }, 
  {
  	timestamps: false,
  	freezeTableName: true
  });

module.exports = Board;