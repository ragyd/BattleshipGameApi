const Sequelize = require('sequelize'),
  connection = new Sequelize('Battleship', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    storage: './data.mysql'
  });

module.exports = connection;
