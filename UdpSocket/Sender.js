const socket = require('./');

const PORT = 5000;
const HOST = '107.185.103.222';

module.exports = {
    sendMessage: (msg) => {

        const msg = new Buffer('Message from server');
        socket.send(msg, 0, msg.length, PORT, HOST, (err, bytes) => {
            if(err) throw err;

            console.log(`UDP message sent to ${HOST} : ${PORT}`);
            socket.close();
        });
    }
}