// Create UDP socket
// Require in Listener and Sender

const dgram = require('dgram');

const PORT = process.env.PORT || 3002;
const HOST = '127.0.0.1';

const socket = dgram.createSocket('udp4');
socket.bind(PORT);

const { sendMessage } = require('./Sender');
setInterval(sendMessage, 500);

module.exports = socket;