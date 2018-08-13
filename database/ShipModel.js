const Sequelize  = require('sequelize');
//const connection = require('.././database/ConnectionMSSQL.js')
const connection = require('.././database/ConnectionMySQL.js')

const Ship = connection.define('Ship', {
    name: {
      type: Sequelize.STRING,
      field: 'name'
    },
    size: {
      type: Sequelize.INTEGER,
      field: 'size'
    }
  }, 
  {
  	timestamps: false,
  	freezeTableName: true
  });

module.exports = Ship;