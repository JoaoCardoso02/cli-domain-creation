const path = require('path')
const fs = require('fs')
const prompt = require("prompt-sync")();
const pluralize = require('pluralize')

function createDomain() {
	const { domainName, pluralDomainName } = getDomainNameAndPluralDomainName()
	createDomainFolder(pluralDomainName)
}

function createDomainFolder(domainName) {
	checkAndCreateFolder(path.resolve('.'), 'domain')
	checkAndCreateFolder(path.resolve('.', 'domain'), domainName)
	checkAndCreateFolder(path.resolve('.', 'domain', domainName), 'entities')
	checkAndCreateFolder(path.resolve('.', 'domain', domainName), 'services')
	checkAndCreateFolder(path.resolve('.', 'domain', domainName), 'infrastructure')
	checkAndCreateFolder(path.resolve('.', 'domain', domainName), 'types')
}

function checkAndCreateFolder(pathName, folderName) {
	if (!fs.existsSync(path.resolve(pathName, folderName))) {
		fs.mkdirSync(path.resolve(pathName, folderName))
	}
}

function getDomainNameAndPluralDomainName() {
	const domainName = getDomainName()
	const pluralDomainName = getPluralDomainName(domainName)

	return {
		domainName,
		pluralDomainName
	}
}

function getDomainName() {
	const domainName = prompt('What is the domain name?')

	if (!domainName) throw new Error('Domain name is needed')

	return domainName
}

function getPluralDomainName(name) {
	let pluralDomainName = prompt('What is the plural domain name?')
	
	if (pluralDomainName) return pluralDomainName

	return pluralize(name)
}

createDomain()