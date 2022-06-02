const req = require('express/lib/request');
const cron = require('node-cron')
const shell = require('shelljs')
const csvtojson = require('csvtojson')
const path = require('path')
const fs = require('fs')
const csvFolder = path.join(__dirname, "csv")

let csvFiles


async function getCsvFromDevice(){
    cron.schedule("0 */1 * * * *", async ()=>{
        console.log("Fetching updated sv's");
            await fs.readdir(csvFolder, async (err, files)=>{
            if(err)
                console.log(err);
            else
            {
                csvFiles = []
                files.map((file)=>{
                    csvFiles.push(file)
                })
            }
            console.log((csvFiles));
            await parseCsv()
        })
    })
}

async function parseCsv(){
    console.log("Parsing csv's");
    if(Array.isArray(csvFiles) && csvFiles.length>0)
    {
       await convertCsvToJson(csvFolder + "/" +(csvFiles[0]))
    }

    
}

async function convertCsvToJson(csvFile){
    console.log("Converting csv to array of objects");
    let medicinesArr = []
    medicinesArr = await csvtojson().fromFile(csvFile)
    medicinesArr.map((medicine)=>{
        console.log(medicine['Product Name']);
    })
    
}

module.exports = {getCsvFromDevice}
