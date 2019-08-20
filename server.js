require('./udpSocket')();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', () => 'Hello I this is my personal website. Ill be adding a udp server soon');

app.listen(PORT, () => console.log('DanielRing.gq is running'));