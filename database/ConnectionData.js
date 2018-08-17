const ConnectionGeneric = require('.././database/Connection.js')

const connection = ConnectionGeneric({
	database: 'Battleship',
	username: 'sa', 
	password: 'Admin2018', 
	type: 'mssql'
});

module.exports = connection;
