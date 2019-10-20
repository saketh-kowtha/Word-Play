const rand = (n) => (new Date()).getTime() % n
var inquirer = require('inquirer');
const colors = require('colors')
const r = require('./requestHandler')

const ops = [{action: r.syn, name: 'Synonym'}, {action:r.ant, name: 'Antonyms'}, {action: r.def, name: 'Definition'}]

async function getObj(){
	try{
		let random = await r.random()
		let randOps = ops[rand(3)]
		let data = await randOps.action(random.data.id)
		if(data.data[0]) return {ques: (data.data[0].words) ? data.data[0].words[rand(data.data[0].words.length - 2)]  : data.data[0].text, name: randOps.name, ans: random.data.id}
	}
	catch(e){
		throw e
	}
}


function start(){
	getObj().then(d => {
 		inquirer.prompt({
    			type: 'input',
    			name: 'input',
			color: 'red',
    			message: `Guess this word based on ${d.name} [*${d.ques}] : `
  		}).then(ans => validate(d.ans, ans.input))
	}).catch(e => console.log(e))
}

const validate = (ans, ip) => {
	if(ans.trim() == ip.trim())
		console.log("You are genius....\n".bold.brightGreen)
	else{
		console.log("Oh! I think you are wrong...\n".bold.brightRed)
  		inquirer.prompt({
        		type: 'list',
        		name: 'option',
        		message: 'Choose your choice',
        		choices: ['1. Try again', '2. Hint', '3. Quit'],
		}).then(answer => {
			if(answer.option.indexOf('3') > -1){
				console.log(`\nAnswer : ${ans}\n\n`.bold.underline.brightGreen)
				process.exit(0)
			}
			else if(answer.option.indexOf('2') > -1){
				inquirer.prompt({
                			type: 'input',
                			name: 'input',
                			message: `Hint [* ${ans.shuffle()}] : `
        			}).then(answer => validate(ans, answer.input))
			}
			else{
				inquirer.prompt({
                			type: 'input',
                			name: 'input',
                			message: `\n\nPlease enter the word : `
        			}).then(answer => validate(ans, answer.input))	
			}
  		});
	}
}


String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

module.exports = start
