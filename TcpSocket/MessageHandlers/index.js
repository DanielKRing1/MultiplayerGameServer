const { updateDirection } = require('./Player');

module.exports = {
    handleMessage: (msg, user) => {
        const json = parseToJson(msg);
    
        switch(json.eventType){
            case 'update-direction':
                updateDirection(json, user);
                break;
        }
    }
}

const parseToJson = (msg) => {
    const jsonMsg = JSON.parse(msg);
    
    return jsonMsg;
}