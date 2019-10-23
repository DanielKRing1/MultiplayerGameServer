const dgram = require('dgram');

const PORT = 3002;
const HOST = "104.174.188.93";

let socket;
console.log('Init Sender');

module.exports = {
    init: (s) => socket = s,
    sendMessage: (ip, port, msg) => {

        console.log("Sending"); 
        const message = JSON.stringify({ test: 'test' });
        socket.send(message, 0, message.length, port, ip, (err, bytes) => {
            if(err) throw err;  

            console.log(`UDP message sent to ${ip} : ${port} : ${bytes}`);
        });
    }
}