const express = require('express')
const cors = require('cors');
const app = express()

const jobs = require('./jobs');
const { setupRabbitMq } = require('./rabbitmq.start');

const port =  3004;

var corsOptions = {
  origin: `http://localhost:${port}`,
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


  

