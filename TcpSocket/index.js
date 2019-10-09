// Create UDP socket
// Require in Listener and Sender

const net = require('net');

const { initUser } = require('../controllers/gameCtrl').init();

const PORT = 3003 || process.env.TCP_PORT;

const server = net.createServer();

server.on('connection', (socket) => {

    console.log('Welcome, Provisional Player!');

    const data = {
        jwt: 'test-jwt',
        eventType: 'generated-jwt',
        testString: 'This is a test string'
    }
    socket.write(data);

    socket.on('data', (data) => {
        console.log('Logging data--------------');
        console.log(data);
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
});

server.listen(PORT, () => console.log(`Tcp Server listening at ${server.address().address} on Port ${server.address().port}`));

function connectToServer(tid, ip) {
    var conn = net.createConnection(23, ip);
    var completeData = '';

    conn.on('connect', function() {
        conn.write (login_string);  // login string hidden in pretend variable
    });
    conn.on('data', function(data) {
        completeData += data;
        var dataArray = completeData.split('your delimiter');
        if(dataArray.size > 1) { //If our data was split into several pieces, we have a complete chunk saved in the 0th position in the array
            doWorkOnTheFirstHalfOfData(dataArray[0]);
            completeData = dataArray[1];// The second portion of data may yet be incomplete, thise may need to be more complete logic if you can get more than one delimeter at a time...
        }
    });
    conn.on('end', function() {
        //do stuff with the "completeData" variable in here.
    });
}
