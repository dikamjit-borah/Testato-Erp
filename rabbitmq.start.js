const amqp = require('amqplib/callback_api')
const config = require('./config.json')


async function setupRabbitMq() {

    return new Promise((resolve, reject) => {
        amqp.connect(`amqp://localhost`, (err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
                return
            }

            connection.createChannel((err, channel) => {
                if (err) {
                    console.log(err);
                    throw err
                }

                global.rabbitMqChannel = channel

                //console.log(simpleStringify(global.rabbitMqChannel))
                //console.log("yoyoyoyoy   "+ JSON.stringify(global.rabbitMqChannel));
                //queue = config.rabbitMqConfig.queuePrefix;
                //global.rabbitMqQueue = queue

                //channel.assertQueue(global.rabbitMqQueue)


            })
            resolve("RabbitMq connection established")
        })

    })
}

function simpleStringify(object) {
    var simpleObject = {};
    for (var prop in object) {
        if (!object.hasOwnProperty(prop)) {
            continue;
        }
        if (typeof (object[prop]) == 'object') {
            continue;
        }
        if (typeof (object[prop]) == 'function') {
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
}


module.exports = { setupRabbitMq }