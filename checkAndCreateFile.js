const path = require('path')
const fs = require('fs')

module.exports = function checkAndCreateFile(pathName, fileName, content) {
	if (!fs.existsSync(path.resolve(pathName, fileName))) {
		fs.writeFileSync(path.resolve(pathName, fileName), content || 'something')
	}
}