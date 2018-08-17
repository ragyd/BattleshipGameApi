const Sequelize  = require('sequelize');
function ConnectionGeneric({database, username, password, type} = {}){
  return new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: type,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    storage: './data.' + type
  }); 
}
module.exports = ConnectionGeneric;