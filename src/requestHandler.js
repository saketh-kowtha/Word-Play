const axios = require('axios')
require('dotenv').config()
const APIHOST = process.env.HOST 
const APIKEY = process.env.APIKEY

async function syn(word){
	let resp = await axios(APIHOST+`/word/${word}/relatedWords?api_key=`+APIKEY)
	return resp
}


async function ant(word){
        let resp = await axios(APIHOST+`/word/${word}/relatedWords?api_key=`+APIKEY)
        return resp
}


async function exp(word){
        let resp = await axios(APIHOST+`/word/${word}/examples?api_key=`+APIKEY)
        return resp
}


async function def(word){
        let resp = await axios(APIHOST+`/word/${word}/definitions?api_key=`+APIKEY)
        return resp
}

async function random(word){
        let resp = await axios(APIHOST+`/words/randomWord?api_key=`+APIKEY)
        return resp
}

module.exports = {syn, ant, exp, def, random}
