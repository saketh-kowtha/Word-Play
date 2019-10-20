const Table = require('cli-table2')
const colors = require('colors')

const fs = require('fs')
const formatter = (data, type) => {
	var table = new Table()
	if(type === 'auto-col'){
		data = data.map(e =>  e.charAt(0).toUpperCase() + e.slice(1));
		let ColCount = Math.ceil(Math.sqrt(data.length))
		while(data.length) table.push(data.splice(0, ColCount));
		write(table.toString())
	}

	else{
		var table = new Table({wordWrap: true, colWidths:[5, process.stdout.columns - 10], head: ['Id'.bold.blue, type.bold.blue]})
		data.forEach((e, index) => table.push([ `#${(index + 1)+''}`.bold.grey , e.text]))
		write(table.toString())
	}
}


const write = (data) => fs.appendFileSync('std.txt', data + "\n")

//const write = (data) => console.log(data)

module.exports = {formatter, write}
