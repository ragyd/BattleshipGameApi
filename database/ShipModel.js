const Sequelize  = require('sequelize');
const connection = require('.././database/ConnectionData.js')

const Ship = connection.define('Ship', {
    name: {
      type: Sequelize.STRING,
      field: 'name',
      allowNull: false
    },
    size: {
      type: Sequelize.INTEGER,
      field: 'size',
      allowNull: false
    }
  },
  {
  	timestamps: false,
  	freezeTableName: true
  });
module.exports = Ship;