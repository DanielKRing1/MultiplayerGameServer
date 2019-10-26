const { onUpdatePlayer } = require('../../controllers/gameCtrl');

module.exports = {
    updateDirection: (json, user) => {
        console.log("Updating Direction...");
    
        // Ensure Unit Vector
        const direction = Math.sqrt(json.direction.x*json.direction.x + json.direction.y*json.direction.y);
        const update = {
            direction
        }
        
        onUpdatePlayer(user.id, user.gameId, update);
    }
}