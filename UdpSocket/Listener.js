const { handleMessage } = require('./MessageHandlers');
const  { verifyToken } = require('../util/jwt');

module.exports = {

    init: (socket) => {
        console.log('Init Listener');

        // INIT
        socket.on('listening', () => {
            const { address, port } = socket.address();

            console.log(`Socket listening at ${address} : ${port}`);
        })

        // MESSAGE
        socket.on('message', async(msg, remote) => {
            console.log(`${remote.address} : ${remote.port} - ${msg}`);

            const parsedMsg = parseMessage(msg);
            if(await msgIsValid(parsedMsg)) handleMessage(parsedMsg, remote);

        });


        // ERROR
        socket.on('error', (error) => {
            console.log('Error: ' + error);
            socket.close();
        });

        // CLOSE
        socket.on('close', () => console.log('Socket has closed !'));


        const { sendMessage } = require('./Sender');

        sendMessage();

        // setInterval(sendMessage, 1000);
        sendMessage();

        // Replaces encrypted jwt with decrypted jwt payload
        const msgIsValid = async(msg) => {
            if(msg.eventType === 'init-player') return true;

            const { jwt, eventType } = msg;

            try {
                
                // Append decrypted JWT
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
    }
}