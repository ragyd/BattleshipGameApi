const dbGame = []
const idHelper = require('./IdHelper.js')

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