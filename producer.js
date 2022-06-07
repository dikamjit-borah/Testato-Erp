const amqp = require('amqplib/callback_api')
const config = require('./config.json')

function sendToRabbitMq(queueName, pattern, data){

    rabbitMqQueue = config.rabbitMqConfig.queuePrefix + "_" + queueName
    if (!global.rabbitMqChannel) {
        throw Error("RabbitMq channel not available")
    }

    global.rabbitMqChannel.assertQueue( rabbitMqQueue , {
        durable: true,
        persistent: true
    });

    const rabbitMqPayload = new Buffer(
        JSON.stringify({
            pattern,
            data
        }))

    console.log("Sending payload to rabbitmq");
    global.rabbitMqChannel.sendToQueue(rabbitMqQueue, rabbitMqPayload, [{ persistent: true }]);
    
    return;
        
}


module.exports = {sendToRabbitMq}



/* 
    amqp.connect('amqp://localhost', (err, connection) =>{
        if(err){
            console.log(err);
            throw err
        }
    
        connection.createChannel((err, channel) =>{
            if(err){
                console.log(err);
                throw err
            }
    
            const queue = 'MEDICINE_DATA'
            channel.assertQueue(queue)
            channel.sendToQueue(queue, Buffer.from("hehehehehehe"))
            console.log("ola");
        })
           
    
    }) */