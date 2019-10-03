// Create UDP socket
// Require in Listener and Sender

const dgram = require('dgram');

const PORT = process.env.PORT || 3005;

const socket = dgram.createSocket('udp4');
socket.bind(PORT);

require('./Sender').init(socket);
require('./Listener').init(socket);

module.exports = socket;