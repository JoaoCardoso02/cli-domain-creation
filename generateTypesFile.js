const path = require('path')

const checkAndCreateFile = require('./checkAndCreateFile')
const capitalizeString = require('./capitalizeString')

module.exports = function generateTypesFile(pathName, domainName, attributes) {
	const typeNameCapitalized = `I${capitalizeString(domainName)}`
	const content = generateFileContent(typeNameCapitalized, attributes)

	checkAndCreateFile(path.resolve(pathName, 'types'), `${typeNameCapitalized}.ts`, content)
}

function generateFileContent(typeName, attributes) {
	return `export interface ${typeName} {
	${attributes.map((attribute) => 
		`${attribute.name}${!attribute.isRequired ? '?' : ''}: ${attribute.type}`).join('\n	')
	}
}
`
}