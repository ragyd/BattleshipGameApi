var Sequelize  = require('sequelize');
var sequelize = new Sequelize('battleship', 'sa', 'Admin2018', {
		host: 'localhost',
		dialect: 'mssql',
		pool: {
			max: 5,
			min: 0,
	    acquire: 30000,
	    idle: 10000
		},
		storage: './data.mssql'
	});


var Game = sequelize.define('Game', {
    gameId: {
        type: Sequelize.INTEGER,
        field: 'game_id'
    },
    token: {
        type: Sequelize.STRING,
        field: 'token'
    },
    session: {
        type: Sequelize.STRING,
        field: 'session'
    }
});

module.exports = Game;