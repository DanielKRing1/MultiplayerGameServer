require('dotenv').config();

require('./udpSocket')();

const Queue = require('./Queue');

const q = new Queue();
console.log(q);
q.enqueue('a');
console.log('Add');
console.log(q);
q.enqueue('b');
console.log('Add');
console.log(q);
q.enqueue('c');
console.log('Add');
console.log(q);
q.enqueue('d');
console.log('Add');
console.log(q);

console.log(`Should be false - ${q.isEmpty()}`);

q.dequeue();
console.log('Remove');
console.log(q);
q.dequeue();
console.log('Remove');
console.log(q);

q.enqueue('z');
console.log('Add');
console.log(q);

const bodyParser = require('body-parser');
// Express
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Router
const router = express.Router();
app.use(router);
const routes = require('./routes');
routes(router);

const PORT = process.env.PORT || 3001;


app.get('/', (req, res) => res.send('Hello this is my personal website. Ill be adding a udp server soon'));

app.listen(PORT, () => console.log(`DanielRing.gq is running on port ${PORT}`));