require('dotenv').config()

const express = require('express')
const cors = require('cors');
const app = express()

const jobs = require('./services/jobs');
const { setupRabbitMq } = require('./rmq/rmq.start');

const port = process.env.PORT || 3004;
var corsOptions = {
  origin: `${process.env.HOST}:${port}`,
};

app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`App running on port ${port}`);

    setupRabbitMq().then((msg)=>{
      console.log(msg);
      jobs.getMedicineData()

    })
  });


  

