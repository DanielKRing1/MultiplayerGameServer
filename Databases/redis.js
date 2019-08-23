const redis = require('redis');

let client;

module.exports = {
    init: () => {
        client = redis.createClient();

        client.on('connect', () => console.log('Redis connected!') );

        client.on('error', (err) => console.log(`Redis error: ${err}`) );
    },

    getClient: () => client
}
