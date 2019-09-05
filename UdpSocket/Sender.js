const socket = require('./');

const PORT = 5000;
const HOST = '107.185.103.222';

module.exports = {
    sendMessage: (msg) => {

        const message = new Buffer('Message from server');
        socket.send(message, 0, message.length, PORT, HOST, (err, bytes) => {
            if(err) throw err;

            console.log(`UDP message sent to ${HOST} : ${PORT}`);
            socket.close();
        });
    }
}