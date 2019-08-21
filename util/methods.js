module.exports = {
    randInt: (low, high) => {
        return low + Math.floor(Math.random() * (high - low + 1));
    }
}