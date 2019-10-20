const requestHandler = require('./requestHandler')
const colors = require('colors')
const formatter = require('./formatter').formatter
const argv = process.argv
const write = require('./formatter').write
const game = require('./game')
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

	write(((typeof statusMsg[status] === 'function') ? statusMsg[status]() : statusMsg[status]).bold.brightRed);
	process.exit(0)
}

const responseHandler = (type, word) => (response) => {
	let data = (response && response.data) || ""
	if(!data){
		write(`No Data`)
		process.exit(0)
	}
	write(` ${opsNames[type]} [ *${word} ] : `.bold.inverse)
	if(type === 'syn' || type === 'ant'){
		if(data.length === 0 || (data.words && data.words.length === 0))
			write('No Data')
		else{
			write(`\n${data[0].words.length} ${opsNames[type]} found for ${word}\n`.italic.green)
			formatter(data[0].words, 'auto-col') //success
		}
	}
	else if(type === 'def'){
		if(data.length != 0){
			write(`\n${data.length} ${opsNames[type]} found for ${word}\n`.italic.green)
			formatter(data, opsNames[type]) //success
		}
		else
			write("No Data")
	}
	else if(type === 'exp'){
		if(data.examples && data.examples.length != 0){
			write(`\n${data.examples.length} ${opsNames[type]} found for ${word}\n`.italic.green)
			formatter(data.examples, opsNames[type]) //success
		}
		else
			write("NO Data")
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

const startGame = () =>  {
	process.stdin.write('GAME PLAY \n'.bold.inverse)
	process.stdin.write('Rules : \n\n* Enter the word based on Synonym || Antonyms || Definition\n\n* If you are foul then you can choose any option in ["Try again", "Hint", "Quit"]\n\n* If you choose [* Try again ] again guess the word or if you choose [ * Hint ] you can guess based on hint and you can also quit the game by choosing option 3 \n\n* You can find the answer before you quit\n\nNote : Use keyboard arrows for Menu input and keyboard for text input\n\n'.grey)
	game()
}

async function randomWord(){ 
	let rand = await requestHandler.random()
	return rand
}
const WOD = () => randomWord().then(s => {write(`Word of the day is : ${s.data.id}\n`.bold.brightYellow);dict(s.data.id)}).catch(errorHandler)


module.exports = {syn, ant, exp, def, dict, randomWord, WOD, startGame}
