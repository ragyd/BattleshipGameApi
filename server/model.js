var Sequelize = require('sequelize'),
	connection = require('./conf');

var Game = connection.config.db.define( 'game', {
	gameId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
		field: 'game_id'
  },
	token: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
		field: 'token'
  },
	session: {
		type: Sequelize.STRING,
		field: 'session'
	}
});

exports.models = {
	game: Game
}