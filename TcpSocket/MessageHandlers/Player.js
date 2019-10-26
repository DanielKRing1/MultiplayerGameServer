const { onUpdatePlayer } = require('../../controllers/gameCtrl');

module.exports = {
    updateDirection: (json, user) => {
        console.log("Updating Direction...");
    
        // Ensure Unit Vector
        const magnitude = Math.sqrt(json.direction.x*json.direction.x + json.direction.y*json.direction.y);
        const direction = {
            x: json.direction.x / magnitude,
            y: json.direction.y / magnitude
        }
        const update = {
            direction
        }
        
        onUpdatePlayer(user.id, user.gameId, update);
    }
}