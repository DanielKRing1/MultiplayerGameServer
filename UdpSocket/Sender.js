const dgram = require('dgram');
const socket = require('./');

const PORT = 3002;
const HOST = '98.149.97.185';
//98.149.97.185

console.log('Init Sender');

module.exports = {
    sendMessage: (msg) => {

        const message = JSON.stringify({ test: 'test' });
        socket.send(message, 0, message.length, PORT, HOST, (err, bytes) => {
            if(err) throw err;  

            console.log(`UDP message sent to ${HOST} : ${PORT} : ${bytes}`);
        });
    }
}