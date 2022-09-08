const path = require('path')
const fs = require('fs')
const prompt = require("prompt-sync")();
const pluralize = require('pluralize')

const generateEntityFile = require('./generateEntityFile')
const generateServiceFile = require('./generateServiceFile')
const generateInfrastructureFile = require('./generateInfrastructureFile')
const generateTypesFile = require('./generateTypesFile')

function createDomain() {
	const { domainName, pluralDomainName } = getDomainNameAndPluralDomainName()
	const attributes = getAttributeWithTypes()
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

function getAttributeWithTypes() {
	let attributes = []

	do {
		attributes.push({
			name: prompt('What is the attribute name?'),
			type: prompt('What is the attribute type?')
		})

	} while ((attributes[attributes.length - 1]?.name && attributes[attributes.length - 1]?.name));

	return attributes
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
	generateServiceFile(path.resolve('.', 'domain', domainName), domainName)
	generateEntityFile(path.resolve('.', 'domain', domainName), domainName)
	generateInfrastructureFile(path.resolve('.', 'domain', domainName), domainName)
	generateTypesFile(path.resolve('.', 'domain', domainName), domainName)
}

createDomain()