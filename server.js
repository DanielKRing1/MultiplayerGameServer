require('dotenv').config();

// EXPRESS
const express = require('express');
const app = express();
// Get remote IP address
app.enable('trust proxy');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// DATABASE
require('./Redis/redis').init();

// ROUTER
const router = express.Router();
app.use(router);
const routes = require('./routes');
routes(router);

const PORT = process.env.PORT || 3001;


app.get('/', (req, res) => res.send('Hello this is my personal website. Ill be adding a udp server soon'));

app.listen(PORT, () => console.log(`DanielRing.gq is running on port ${PORT}`));