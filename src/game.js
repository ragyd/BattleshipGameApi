const dbGame = []
const idHelper = require('./IdHelper.js')
const GameBd = require('.././server/model.js')

class Game {
	constructor({cols = 10, rows = 10} = {}){
		this.cols = cols;
		this.rows = rows;
	}
	static create({cols = 10, rows = 10} = {}) {
		const game = new Game({cols,rows});
		game.id = dbGame.length + 1;
		game.playerId = idHelper();
		const token = idHelper();
		game.token = token
		dbGame.push(game);
		game.session = `http://localhost:3000/game?token=${token}`;
		GameBd.sync()
		  .then(() => Game.create({
		    gameId: game.id,
		    token: game.token,
		    session: game.session
		  }))
		  .then(game => {
		    console.log(game.toJSON());
		  });
		return Promise.resolve({
			id : game.id, 
			session : game.session,
			playerId : game.playerId
		})
	}

	static join(token) {
		const game = dbGame.find(game => game.token === token);
		if(game === undefined) {
			return Promise.reject()		
		}
		return Promise.resolve({
			id : game.id,
			playerId : idHelper()
		});
	}
}

module.exports = Game