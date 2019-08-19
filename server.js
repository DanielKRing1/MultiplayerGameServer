const dgram                             = require('dgram')
//const express                         = require('express');
const { queueMessage }                    = require('./MessageQueue').init();

const PORT = process.env.PORT || 3002;
const HOST = '127.0.0.1';

const server = dgram.createSocket('udp4');


// INIT
server.on('listening', () => {
    const { address, port } = server.address();

    console.log(`Server listening at ${address} : ${port}`);
})

// MESSAGE
server.on('message', (msg, remote) => {
    console.log(`${remote.address} : ${remote.port} - ${msg}`);

    queueMessage(msg);
});


// ERROR
server.on('error', (error) => {
    console.log('Error: ' + error);
    server.close();
});

// CLOSE
server.on('close', () => console.log('Socket has closed !'));

server.bind(PORT, HOST);

// const app = express();
// app.get('/', (req, res) => res.send(JSON.stringify({ Hello: 'World'})));
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));