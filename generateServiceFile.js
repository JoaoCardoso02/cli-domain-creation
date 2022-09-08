const path = require('path')

const checkAndCreateFile = require('./checkAndCreateFile')
const capitalizeString = require('./capitalizeString')

module.exports = function generateServiceFile(pathName, domainName) {
	const domainNameCapitalized = capitalizeString(domainName)

	checkAndCreateFile(path.resolve(pathName, 'services'), `${domainNameCapitalized}Service.ts`)
	checkAndCreateFile(path.resolve(pathName, 'services', '__tests__'), `${domainNameCapitalized}Service.spec.ts`)
}