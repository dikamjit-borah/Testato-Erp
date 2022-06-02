const express = require('express')
const cors = require('cors');
const app = express()

const jobs = require('./jobs');
const { setupRabbitMq } = require('./rabbitmq.start');

const port = process.env.PORT || 3000;

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

    //fun1()
  });

  var x = 1

  async function fun1(){
      console.log("fun1");
       fun2().then(()=>{console.log("then"+x);})

       const isItDoneYet = new Promise((resolve, reject) => {
        if (done) {
          const workDone = 'Here is the thing I built';
          resolve(workDone);
        } else {
          const why = 'Still working on something else';
          reject(why);
        }
      });

      console.log("fun1" + x);
  }

  async function fun2(){
    await setTimeout(function(){x = 3, console.log("timepit"+x);},1000);
    console.log("fun2 "+ x);
  }



  

