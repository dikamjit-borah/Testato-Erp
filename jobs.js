const cron = require('node-cron')
const csvtojson = require('csvtojson')
const path = require('path')
const fs = require('fs');
const { sendToRabbitMq } = require('./producer');
const { Constants } = require('./constants');

const csvFolder = path.join(__dirname, "csv")

async function getMedicineData() {
    cron.schedule("0 */1 * * * *", async () => {
        console.log("Fetching medicine data");
       
        generateMedicineData().then((resultsArr)=>{ 

            console.log("Medicine data generated");
            let erpData = {
                pharmacyId:Constants.PHARMACY_ID,
                medicineData: resultsArr
            }    
            sendToRabbitMq(Constants.MEDICINE_DATA_QUEUE, Constants.UPDATE_MEDICINE_DATA_PATTERN,  erpData)
        })       
    })

}

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

module.exports = { getMedicineData }
