module.exports = {
    randInt: (low, high) => {
        return low + Math.floor(Math.random() * (high - low + 1));
    },
    normalizeVector: (vector) => {
        const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        const unitVector = {
            x: vector.x / magnitude,
            y: vector.y / magnitude
        };
    
        return unitVector;
    }
}