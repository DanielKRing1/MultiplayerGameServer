require('dotenv').config();

// EXPRESS
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
// Get remote IP address
app.enable('trust proxy');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// DATABASE
require('./Redis').init();

// ROUTER
const router = express.Router();
app.use(router);
const routes = require('./routes');
routes(router);

app.get('/', (req, res) => res.send('Hello this is my personal website. Ill be adding a udp server soon'));

app.listen(PORT, () => console.log(`DanielRing.gq is running on port ${PORT}`));