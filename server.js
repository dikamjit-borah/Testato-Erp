const express = require('express')
const cors = require('cors');
const app = express()

const jobs = require('./jobs')

const port = process.env.PORT || 3000;

var corsOptions = {
  origin: `http://localhost:${port}`,
};

app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`App running on port ${port}`);
    jobs.getCsvFromDevice()
  });



  

