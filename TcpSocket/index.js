// Create UDP socket
// Require in Listener and Sender

const net = require('net');

const { onInitPlayer, onRemovePlayer } = require('../controllers/gameCtrl').init();

const PORT = 3003 || process.env.TCP_PORT;

const server = net.createServer();

server.on('connection', (socket) => {

    console.log('Welcome, Provisional Player!');

    // Respond with success
    // Return jwt to client
    initPlayer(socket);

    socket.on('data', (data) => {
        console.log('Logging data--------------');
        console.log(data);

        switch(data.eventType){
            
        }
    });

    socket.on('end', async () => {
        try{

            const token = await initUser(socket);
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

const initPlayer = (socket) => {
    const jwt = onInitPlayer(socket);

    const data = {
        jwt,
        eventType: 'connected-main-tcp'
    }
    const bufferData = Buffer.from(JSON.stringify(data));
    socket.write(bufferData);
}