const Sequelize = require('sequelize'),
	connection = new Sequelize('Battleship', 'sa', 'Admin2018', {
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

module.exports = connection;