const actions = require('./src/actions')
process.stdout.write('\033c');
let argsLength = process.argv.length


if(argsLength < 2 || argsLength > 4){
	console.log("Invalid arguments passed")
	process.exit(0)
}


const $ = (process.argv.length > 1 && process.argv[2]) ? process.argv[2].replace(/^("|')(.*)("|')$/, '$1') : "";

const ops = {
	'syn' : actions.syn,
	'ant' : actions.ant,
	'def' : actions.def,
	'exp' : actions.exp,
	'' : actions.WOD,
	'dict' :  actions.dict
}
ops[$]()
