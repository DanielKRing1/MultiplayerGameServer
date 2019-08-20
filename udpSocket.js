const dgram                             = require('dgram')
//const express                         = require('express');
const { queueMessage }                  = require('./MessageQueue').init();

const PORT = process.env.PORT || 3002;
const HOST = '127.0.0.1';

const socket = dgram.createSocket('udp4');

module.exports = () => {
    // INIT
    socket.on('listening', () => {
        const { address, port } = socket.address();

        console.log(`socket listening at ${address} : ${port}`);
    })

    // MESSAGE
    socket.on('message', (msg, remote) => {
        console.log(`${remote.address} : ${remote.port} - ${msg}`);

        queueMessage(msg);
    });


    // ERROR
    socket.on('error', (error) => {
        console.log('Error: ' + error);
        socket.close();
    });

    // CLOSE
    socket.on('close', () => console.log('Socket has closed !'));

    socket.bind(PORT, HOST);

    // const app = express();
    // app.get('/', (req, res) => res.send(JSON.stringify({ Hello: 'World'})));
    // app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}