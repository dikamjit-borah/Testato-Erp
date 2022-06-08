const csvtojson = require('csvtojson')
const path = require('path')
const fs = require('fs');

const csvFolder = path.join(__dirname, "csv")

async function generateMedicineData() {
    return new Promise((resolve, reject) =>{
        console.log("Obtaining updated csv's");
        let resultsArr = []
        let csvFiles = []
        fs.readdir(csvFolder, async (err, files) =>  {
            if (err){
                console.log(err)
                reject(err)
                return
            }
            else {
                files.map((file) => {
                    csvFiles.push(file)
                })
            }
            resultsArr = await parseCsv(csvFiles)
            resolve(resultsArr)
        })
    })
    
}

async function parseCsv(csvFiles) {
    console.log("Parsing csv's");
    if (Array.isArray(csvFiles) && csvFiles.length > 0) {
        let resultsArr =  await convertCsvToJson(csvFolder + "/" + (csvFiles[0]))
        return resultsArr
    }


}

async function convertCsvToJson(csvFile) {
    console.log("Converting csv to array of objects");
    let resultsArr = []
    resultsArr = await csvtojson().fromFile(csvFile)
    return resultsArr

}


module.exports = {generateMedicineData}