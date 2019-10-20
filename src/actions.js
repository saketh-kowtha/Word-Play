const requestHandler = require('./requestHandler')
const colors = require('colors')
const formatter = require('./formatter')
const argv = process.argv

const opsNames = {
	syn  : 'Synonyms',
	ant  : 'Antonyms',
	exp  : 'Examples',
	def  : 'Definition '	
}

const errorHandler = (type, word) => (err) => {
	let status = err.response.status
	let statusMsg = {
		404 : () => `Please check the word '${word}'`,
		400 : () => `No '${opsNames[type]}' found for '${word}'`,
		401 : "API key is not valid please check it...",
		500 : "Internal server error!!!"
	}

	console.log(((typeof statusMsg[status] === 'function') ? statusMsg[status]() : statusMsg[status]).bold.brightRed);
	process.exit(0)
}

const responseHandler = (type, word) => (response) => {
	let data = (response && response.data) || ""
	if(!data){
		console.log(`No Data`)
		process.exit(0)
	}
	console.log(` ${opsNames[type]} [ *${word} ] : \n`.bold.inverse)
	if(type === 'syn' || type === 'ant'){
		if(data.length === 0 || (data.words && data.words.length === 0))
			console.log('No Data')
		else{
			console.log(`\n${data[0].words.length} ${opsNames[type]} found for ${word}\n`.italic.green)
			formatter(data[0].words, 'auto-col') //success
		}
	}
	else if(type === 'def'){
		if(data.length != 0){
			console.log(`\n${data.length} ${opsNames[type]} found for ${word}\n`.italic.green)
			formatter(data, opsNames[type]) //success
		}
		else
			console.log("No Data")
	}
	else if(type === 'exp'){
		if(data.examples && data.examples.length != 0){
			console.log(`\n${data.examples.length} ${opsNames[type]} found for ${word}\n`.italic.green)
			formatter(data.examples, opsNames[type]) //success
		}
		else
			console.log("NO Data")
	}
}


const syn = (word = argv[3]) => requestHandler.syn(word).then(responseHandler('syn', word)).catch(errorHandler('syn', word))

const ant = (word = argv[3]) => requestHandler.ant(word).then(responseHandler('ant', word)).catch(errorHandler('ant', word))

const exp = (word = argv[3]) => requestHandler.exp(word).then(responseHandler('exp', word)).catch(errorHandler('exp', word))

const def = (word = argv[3]) => requestHandler.def(word).then(responseHandler('def', word)).catch(errorHandler('def', word))

const  dict = ( word = argv[3] ? argv[3] : argv[2] ) => {
	syn(word)
	ant(word)
	exp(word)
	def(word)
}

async function randomWord(){ 
	let rand = await requestHandler.random()
	return rand
}
const WOD = () => randomWord().then(s => {console.log(`Word of the day is : ${s.data.id}\n`);dict(s.data.id)}).catch(errorHandler)



module.exports = {syn, ant, exp, def, dict, randomWord, WOD}
