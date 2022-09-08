const path = require('path')

const checkAndCreateFile = require('./checkAndCreateFile')
const capitalizeString = require('./capitalizeString')

module.exports = function generateEntityFile(pathName, domainName) {
	const domainNameCapitalized = capitalizeString(domainName)

	checkAndCreateFile(path.resolve(pathName, 'entities'), `${domainNameCapitalized}.ts`)
	checkAndCreateFile(path.resolve(pathName, 'entities', '__tests__'), `${domainNameCapitalized}.spec.ts`)
}