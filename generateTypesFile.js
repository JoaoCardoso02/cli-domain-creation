const path = require('path')

const checkAndCreateFile = require('./checkAndCreateFile')
const capitalizeString = require('./capitalizeString')

module.exports = function generateTypesFile(pathName, domainName) {
	const domainNameCapitalized = capitalizeString(domainName)

	checkAndCreateFile(path.resolve(pathName, 'types'), `I${domainNameCapitalized}.ts`)
}