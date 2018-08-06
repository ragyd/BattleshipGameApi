const Sequelize = require('sequelize'),
	sequelize = new Sequelize('battleship', null, null, {
		host: 'localhost',
		dialect: 'mssql',
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},
		storage: './data.mssql'
	});

exports.config = {
	db: sequelize 
};