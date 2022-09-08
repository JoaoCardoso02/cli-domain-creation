const path = require('path')
const fs = require('fs')
const prompt = require("prompt-sync")();
const pluralize = require('pluralize')

function createDomain() {
	const { domainName, pluralDomainName } = getDomainNameAndPluralDomainName()
	createDomainFolder(domainName)
	createDomainFiles(domainName)
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

function createDomainFolder(domainName) {
	checkAndCreateFolder(path.resolve('.'), 'domain')
	checkAndCreateFolder(path.resolve('.', 'domain'), domainName)
	checkAndCreateFolder(path.resolve('.', 'domain', domainName), 'entities')
	checkAndCreateFolder(path.resolve('.', 'domain', domainName), 'services')
	checkAndCreateFolder(path.resolve('.', 'domain', domainName), 'infrastructure')
	checkAndCreateFolder(path.resolve('.', 'domain', domainName), 'types')

	checkAndCreateFolder(path.resolve('.', 'domain', domainName, 'entities'), '__tests__')
	checkAndCreateFolder(path.resolve('.', 'domain', domainName, 'services'), '__tests__')
	checkAndCreateFolder(path.resolve('.', 'domain', domainName, 'infrastructure'), '__tests__')
}

function checkAndCreateFolder(pathName, folderName) {
	if (!fs.existsSync(path.resolve(pathName, folderName))) {
		fs.mkdirSync(path.resolve(pathName, folderName))
	}
}

function createDomainFiles(domainName) {
	const domainNameCapitalized = capitalizeString(domainName)

	checkAndCreateFile(path.resolve('.', 'domain', domainName, 'entities'), `${domainNameCapitalized}.ts`)
	checkAndCreateFile(path.resolve('.', 'domain', domainName, 'services'), `${domainNameCapitalized}Service.ts`)
	checkAndCreateFile(path.resolve('.', 'domain', domainName, 'infrastructure'), `${domainNameCapitalized}Repository.ts`)
	checkAndCreateFile(path.resolve('.', 'domain', domainName, 'types'), `I${domainNameCapitalized}.ts`)

	checkAndCreateFile(path.resolve('.', 'domain', domainName, 'entities', '__tests__'), `${domainNameCapitalized}.spec.ts`)
	checkAndCreateFile(path.resolve('.', 'domain', domainName, 'services', '__tests__'), `${domainNameCapitalized}Service.spec.ts`)
	checkAndCreateFile(path.resolve('.', 'domain', domainName, 'infrastructure', '__tests__'), `${domainNameCapitalized}Repository.spec.ts`)
}

function checkAndCreateFile(pathName, fileName) {
	if (!fs.existsSync(path.resolve(pathName, fileName))) {
		fs.writeFileSync(path.resolve(pathName, fileName), 'something')
	}
}

function capitalizeString(name) {
	return name.charAt(0).toUpperCase() + name.slice(1);
}

createDomain()