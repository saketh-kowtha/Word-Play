const fs = require('fs')
const actions = require("./src/actions")

console.time('\x1b[36mProcessing Time ', 'Processing Time ' ,'\x1b[0m')
let args = process.argv

const ops = {
        'syn' : actions.syn,
        'ant' : actions.ant,
        'def' : actions.def,
        'ex' : actions.exp,
        'dict' :  actions.dict
}


if(args.length === 2){
	actions.WOD()
}
else if(args.length === 3){
	if(!ops[args[2]])
		ops['dict']()
}
else if(args.length === 4){
	if(ops[args[2]]) {
		ops[args[2]]() 
	}
	else{
 		process.stdout.write("Invalid Arguments passed \n")
	}
}
process.on('exit', function(){
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
        //console.timeEnd("Processing Time ")
	console.timeEnd('\x1b[36mProcessing Time ', 'Processing Time ' ,'\x1b[0m')
})
