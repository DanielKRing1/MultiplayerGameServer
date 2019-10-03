const jwt = require('jsonwebtoken');
const publicKey = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');
const privateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');

const i = process.env.APP_NAME;
const s = 'User';
const a = `${process.env.APP_NAME}_APP`
const signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: '1d',
    algorithm: 'HS256'
}

module.exports = {
    createAndSendToken: async (payload, res) => {
        try {
            console.log('In createAndSendJwt');
            const token = await jwt.sign(payload, privateKey, signOptions);
            console.log(token);
            
            console.log('token');
            res.send(token)
        }catch(err) {
            console.log(err);
            res.status(500).send('Could not create token');
        }
    },
    getToken: async (payload) => {
        try {
            console.log('In createJwt');
            const token = await jwt.sign(payload, privateKey, signOptions);

            console.log(token);
            
            console.log('token');
            return token;
        }catch(err) {
            console.log(err);
        }
    },
    verifyToken: async (token) => {
        try{
            // console.log('Verifying');
            
            console.time("verify jwt");
            const payload = await jwt.verify(token, privateKey, signOptions);
            console.timeEnd("verify jwt");

            return payload;
        }catch(err) {
            console.log(err);
            return;
        }
    }
}
