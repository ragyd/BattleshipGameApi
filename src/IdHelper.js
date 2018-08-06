const crypto = require('crypto')

function generateId(argument) {
	return crypto.randomBytes(12).toString('hex');
}
module.exports = generateId;