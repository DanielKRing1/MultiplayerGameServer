// Create UDP socket
// Require in Listener and Sender

const net = require('net');

const { onInitPlayer, onRemovePlayer } = require('../controllers/gameCtrl').init();

const PORT = 3003 || process.env.TCP_PORT;

const server = net.createServer();

server.on('connection', (socket) => {

    console.log('1. START/END ---- Connect Tcp Socket');

    // Respond with success
    // Return jwt to client
    initPlayer(socket);

    socket.on('data', (data) => {
        console.log('Logging data--------------');
        
        data = parseMessage(data);
        console.log(data);

        switch(data.eventType){
            
        }
    });

    socket.on('end', async () => {
        console.log("Enddddddd-----------------------------");
        try{

            if(token){
                socket.write(token);
            }else{
                console.log('Did not receive a Token to give User');
            }

        }catch(err) {
            console.log(err);
        }
    });

    socket.on('close', () => {
        removePlayer(socket.player);
    });
});

server.listen(PORT, () => console.log(`Tcp Server listening at ${server.address().address} on Port ${server.address().port}`));

const initPlayer = async (socket) => {
    const jwt = await onInitPlayer(socket);

    console.log('2. START/END ---- Return Jwt');

    const data = {
        jwt,
        eventType: 'connected-main-tcp'
    }
    console.log(data);
    const bufferData = Buffer.from(JSON.stringify(data));
    socket.write(bufferData);
}

const parseMessage = (msg) => {
    const jsonMsg = JSON.parse(msg);
    
    return jsonMsg;
}