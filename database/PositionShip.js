const Sequelize  = require('sequelize');
//const connection = require('.././database/ConnectionMSSQL.js')
const connection = require('.././database/ConnectionMySQL.js')

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
  }, 
  {
  	timestamps: false,
  	freezeTableName: true
  });

module.exports = PositionShip;