const idHelper = require('./IdHelper.js')
const GameBd = require('.././database/GameModel.js')

class Game {
	constructor({cols = 10, rows = 10} = {}) {
		this.cols = cols;
		this.rows = rows;
	}

	static create({cols = 10, rows = 10} = {}) {
		const game = new Game({cols,rows});
		game.playerId = idHelper();
		const token = idHelper();
		game.token = token
		game.session = `http://localhost:3000/game?token=${token}`;
		return GameBd.sync()
		  .then(() => GameBd.create({
				token,
				playerId1 : game.playerId
		  }))
	}

	static join(token) {
		const game = GameBd.findAll(
	    { where: { token: token }}
	  )
		if(game === undefined) {
			return Promise.reject()
		}
		GameBd.update(
	    { playerId2: idHelper() },
	    { where: { token: token }}
	  )
		return Promise.resolve(game);
	}
}

module.exports = Game