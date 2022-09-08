const path = require('path')
const fs = require('fs')

module.exports = function checkAndCreateFile(pathName, fileName) {
	if (!fs.existsSync(path.resolve(pathName, fileName))) {
		fs.writeFileSync(path.resolve(pathName, fileName), 'something')
	}
}