const amqp = require('amqplib/callback_api')
const config = require('./config.json')


async function setupRabbitMq() {

    return new Promise((resolve, reject) => {
        amqp.connect(`amqp://${process.env.RMQ_IP}`, (err, connection) => {
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
            })
            resolve("RabbitMq connection established")
        })

    })
}

module.exports = { setupRabbitMq }