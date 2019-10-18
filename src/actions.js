const requestHandler = require('./requestHandler')

const syn = (word) => requestHandler.syn(word).then(s=> console.log(s.data)).catch(e=> console.log(e))


const ant = (word) => requestHandler.ant(word).then(s=> console.log(s.data)).catch(e=> console.log(e))


const exp = (word) => respPayload = requestHandler.exp(word).then(s=> console.log(s.data)).catch(e=> console.log(e))


const def = (word) => respPayload = requestHandler.def(word).then(s=> console.log(s.data)).catch(e=> console.log(e))

const dict = (word) => {
	syn(word)
	ant(word)
	exp(word)
	def(word)
}

async function randomWord(){ 
	let rand = await requestHandler.random()
	return rand
}
const WOD = () => randomWord().then(s => dict(s.data.id)).catch(e => console.log(e))



module.exports = {syn, ant, exp, def, dict, randomWord, WOD}
