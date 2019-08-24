const dgram                             = require('dgram')
//const express                         = require('express');
const { queueMessage, handleMessage }                  = require('./MessageQueue').init();
const { verifyToken }                   = require('./util/jwt');

const PORT = process.env.PORT || 3002;
const HOST = '127.0.0.1';


module.exports = () => {
    const socket = dgram.createSocket('udp4');

    // INIT
    socket.on('listening', () => {
        const { address, port } = socket.address();

        console.log(`socket listening at ${address} : ${port}`);
    })

    // MESSAGE
    socket.on('message', async(msg, remote) => {
        console.log(`${remote.address} : ${remote.port} - ${msg}`);

        const parsedMsg = parseMessage(msg);
        if(msgIsValid(parsedMsg)) handleMessage(parsedMsg);

        //queueMessage(msg);
    });


    // ERROR
    socket.on('error', (error) => {
        console.log('Error: ' + error);
        socket.close();
    });

    // CLOSE
    socket.on('close', () => console.log('Socket has closed !'));

    socket.bind(PORT);

    // const app = express();
    // app.get('/', (req, res) => res.send(JSON.stringify({ Hello: 'World'})));
    // app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

const msgIsValid = async(msg) => {
    const { jwt } = msg;

    try {
        
        const valid = await verifyToken(jwt);

        console.time('jwt');
        for(let i = 0; i < 1000; i++) {
            await verifyToken(jwt);
        }
        console.timeEnd('jwt');

        if(valid) return true;
        else return false;

    }catch(err) {
        console.log(err);
        return false;
    }
}

const parseMessage = (msg) => {
    const jsonMsg = JSON.parse(msg);
    
    return jsonMsg;
}