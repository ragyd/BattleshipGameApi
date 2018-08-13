const Sequelize  = require('sequelize');
const connection = require('.././database/ConnectionMSSQL.js')

const Game = connection.define('Game', {
    token: {
      type: Sequelize.STRING,
      field: 'token',
      allowNull: false   
    },
    playerId1: {
      type: Sequelize.STRING,
      field: 'first_player_id',
      allowNull: false      
    },
    playerId2: {
      type: Sequelize.STRING,
      field: 'second_player_id'  
    }
  },
  {
  	timestamps: false,
  	freezeTableName: true
  });

module.exports = Game;