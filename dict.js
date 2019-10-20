const fs = require('fs')
const actions = require("./src/actions")
const os = require('os')

console.clear()
console.log(`Hello ${os.userInfo().username}!!!\n`)

/**
 * Checking STD file if exist deleting sync at start of the process
 */
try {
  if (fs.existsSync(path)) {
   	fs.unlinkSync('std.txt')
  }
} catch(err) {
        //process.stderr
}

console.time('\x1b[36mProcessing Time ', 'Processing Time ' ,'\x1b[0m')

let args = process.argv

const ops = {
        'syn' : actions.syn,
        'ant' : actions.ant,
        'def' : actions.def,
        'ex' : actions.exp,
        'dict' :  actions.dict,
	'play' : actions.startGame
}


if(args.length === 2){
	actions.WOD()
}
else if(args.length === 3){
	if(!ops[args[2]])
		ops['dict']()
	else if(args[2] === 'play')
		ops['play']()
}
else if(args.length === 4){
	if(ops[args[2]]) {
		ops[args[2]]() 
	}
	else{
 		process.stdout.write("Invalid Arguments passed \n")
	}
}



/**
 * Process exit event
 */
process.on('exit', function(){
        if(args[2] === 'play')
		return
	let data
        try
        {
                data = fs.readFileSync('std.txt')
		fs.unlinkSync('std.txt')
        }
        catch(e){
                data = `Problem while reading std file please read std file for output` + e
        }
        process.stdout.write(data.toString() + "\n")
	console.timeEnd('\x1b[36mProcessing Time ', 'Processing Time ' ,'\x1b[0m')
})
