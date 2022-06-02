const req = require('express/lib/request');
const cron = require('node-cron')
const shell = require('shelljs')
const csvtojson = require('csvtojson')
const path = require('path')
const fs = require('fs');
const { sendToRabbitMq } = require('./producer');
const config = require('./config.json')
const csvFolder = path.join(__dirname, "csv")
const amqp = require('amqplib/callback_api')


async function getMedicineData() {
    cron.schedule("0 */1 * * * *", async () => {
        console.log("Fetching medicine data");
       
        generateMedicineData().then((resultsArr)=>{ 

            let rabbitMqPayload = {
                pharmacyId:"7002936200",
                medicineData: resultsArr
            }    
            sendToRabbitMq("MEDICINE-DATA", rabbitMqPayload)
        })
       //console.log(medicineData);
        //sendToRabbitMq(medicineData)
       
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
