require('dotenv').config();

require('./udpSocket')();

// Express
const express = require('express');
const app = express();
// Router
const router = express.Router();
app.use(router);
const routes = require('./routes');
routes(router);

const PORT = process.env.PORT || 3001;


app.get('/', (req, res) => res.send('Hello this is my personal website. Ill be adding a udp server soon'));

app.listen(PORT, () => console.log(`DanielRing.gq is running on port ${PORT}`));