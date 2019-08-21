const gameCtrl = require('../controllers/gameCtrl');

module.exports = (router) => {
    router
        .route('/init-connection')
        .put(gameCtrl.addPlayer);
}