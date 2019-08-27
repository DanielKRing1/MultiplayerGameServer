const socket = require('./');
const { handleMessage } = require('./MessageHandlers');

// INIT
socket.on('listening', () => {
    const { address, port } = socket.address();

    console.log(`socket listening at ${address} : ${port}`);
})

// MESSAGE
socket.on('message', async(msg, remote) => {
    console.log(`${remote.address} : ${remote.port} - ${msg}`);

    const parsedMsg = parseMessage(msg);
    if(await msgIsValid(parsedMsg)) handleMessage(parsedMsg);

});


// ERROR
socket.on('error', (error) => {
    console.log('Error: ' + error);
    socket.close();
});

// CLOSE
socket.on('close', () => console.log('Socket has closed !'));



// Replaces encrypted jwt with decrypted jwt payload
const msgIsValid = async(msg) => {
    const { jwt, eventType } = msg;

    try {
        
        const payload = await verifyToken(jwt);
        msg.jwt = payload;

        return !!payload && eventType !== undefined;

    }catch(err) {
        console.log(err);
        return false;
    }
}

const parseMessage = (msg) => {
    const jsonMsg = JSON.parse(msg);
    
    return jsonMsg;
}