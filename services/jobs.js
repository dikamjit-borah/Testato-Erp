const cron = require('node-cron')
const { sendToRabbitMq } = require('../rmq/rmq.producer');
const { Constants } = require('../utils/constants');
const { generateMedicineData } = require('../controllers/medicineController');

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

module.exports = { getMedicineData }
