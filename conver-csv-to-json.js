

const csv		= require('csvtojson')
const fs 		= require("fs")
const path 		= require("path")
const fName		= 'customer-data.json'

const convertCSV = (file='customer-data.csv') => {
	
	let data = []
	let r = 0
	
	csv({
		delimiter:'auto'
	})
	.fromFile(path.join(__dirname, file))
	.on('json',(jsonObj)=>{
		// combine csv header row and csv line to a json object
		// jsonObj.a ==> 1 or 4
		data.push(jsonObj)
		r++
	})
	.on('done', (error) => {
		if (error) return process.exit(1)
			
		fs.writeFileSync(path.join(__dirname, fName), JSON.stringify(data, null, 2), (error) => {
			if(error) return process.exit(1)

		})
		console.log("end ran " + r + " times")
		process.exit(0)
	})
}

convertCSV(process.argv[2])  