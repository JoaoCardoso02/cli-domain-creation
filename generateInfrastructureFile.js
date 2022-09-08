const path = require('path')

const checkAndCreateFile = require('./checkAndCreateFile')
const capitalizeString = require('./capitalizeString')

module.exports = function generateInfrastructureFile(pathName, domainName) {
	const domainNameCapitalized = capitalizeString(domainName)

	checkAndCreateFile(path.resolve(pathName, 'infrastructure'), `${domainNameCapitalized}Repository.ts`)
	checkAndCreateFile(path.resolve(pathName, 'infrastructure', '__tests__'), `${domainNameCapitalized}Repository.spec.ts`)
}