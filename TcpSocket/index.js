// Create UDP socket
// Require in Listener and Sender

const net = require('net');

const { handleMessage } = require('./MessageHandlers');
const { onInitPlayer, onRemovePlayer } = require('../controllers/gameCtrl').init();

const PORT = 3003 || process.env.TCP_PORT;

const server = net.createServer();

server.on('connection', (socket) => {

    console.log('1. START/END ---- Connect Tcp Socket');

    // Respond with success
    // Return jwt to client
    initPlayer(socket);

    let unterminatedMessage = '';
    socket.on('data', (data) => {
        console.log('Tcp Socket on data--------------');
        
        unterminatedMessage = handleFragments(socket.user, unterminatedMessage, data);
        console.log(`Unfinished message: '${unterminatedMessage}'`);

    });

    socket.on('end', async () => {
        console.log("Enddddddd-----------------------------");
        try{

        }catch(err) {
            console.log(err);
        }
    });

    socket.on('close', () => {
        console.log("Closed Tcp Socket------------------------------------");
        console.log(socket.user);
        onRemovePlayer(socket.user);
    });

    socket.on('error', (err) => {
        console.log(err);
    });
});

server.listen(PORT, () => console.log(`Tcp Server listening at ${server.address().address} on Port ${server.address().port}`));

const initPlayer = async (socket) => {
    const { user, jwt } = await onInitPlayer(socket);
    
    // Store user data on socket
    socket.user = user;
    
    sendJwtToUser(socket, jwt);
}
const sendJwtToUser = (socket, jwt) => {
    console.log('2. START/END ---- Return Jwt');
    const data = {
        jwt,
        eventType: 'connected-main-tcp'
    }
    console.log(data);
    const bufferData = Buffer.from(JSON.stringify(data));
    socket.write(bufferData);
}

const handleFragments = (user, currentMsg, data) => {
    let message = currentMsg;

    data = parseToString(data);
    console.log(data);
    const dataFragments = data.split('\\END');
    const fragmentCount = dataFragments.length;

    // Handle Intermediate Fragments
    for(let i = 0; i < fragmentCount - 1; i++){
        const fragment = dataFragments[i];
        message += fragment;
        handleMessage(message, user);

        message = '';
    }

    // Handle Last Fragment
    message += dataFragments[fragmentCount - 1];

    return message;
}


const parseToString = (msg) => {
    const stringMsg = msg.toString();

    return stringMsg;
}