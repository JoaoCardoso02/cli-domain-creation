const path = require('path')

const checkAndCreateFile = require('./checkAndCreateFile')
const capitalizeString = require('./capitalizeString')

module.exports = function generateEntityFile(pathName, domainName, attributes) {
	const domainNameCapitalized = capitalizeString(domainName)

	const content = generateFileContent(domainNameCapitalized, attributes)

	checkAndCreateFile(path.resolve(pathName, 'entities'), `${domainNameCapitalized}.ts`, content)
	checkAndCreateFile(path.resolve(pathName, 'entities', '__tests__'), `${domainNameCapitalized}.spec.ts`)
}

function generateFileContent(domainName, attributes) {
	const typeNameCapitalized = `I${domainName}`

	return `import { ${typeNameCapitalized} } from '../types/${typeNameCapitalized}'

	export default class ${domainName} {
	${attributes.map((attribute) => 
		`${attribute.name}${!attribute.isRequired ? '?' : ''}: ${attribute.type}`).join('\n	')
	}

	constructor(data: ${typeNameCapitalized}) {
		${attributes.map((attribute) => 
		`this.set${capitalizeString(attribute.name)}(data.${attribute.name})`).join('\n		')
		}
	}

	${attributes.map((attribute) => 
	`set${capitalizeString(attribute.name)}(${attribute.name}${!attribute.isRequired ? '?' : ''}: ${attribute.type}) {
		this.${attribute.name} = ${attribute.name}
	}

	get${capitalizeString(attribute.name)}(): ${attribute.isRequired ? attribute.type : `${attribute.type + ' | undefined'}`} {
		return this.${attribute.name}
	}
	`).join('\n	')
	}
}
`
}
