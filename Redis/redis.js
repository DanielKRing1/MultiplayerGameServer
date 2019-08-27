// const redis = require('redis');
// const Promise = require('bluebird');

// let client;

// module.exports = {
//     init: () => {
//         client = Promise.promisifyAll(redis.createClient());

//         client.on('connect', () => console.log('Redis connected!') );

//         client.on('error', (err) => console.log(`Redis error: ${err}`) );
//     },

//     getClient: () => client
// }
