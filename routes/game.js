const gameCtrl = require('../controllers/gameCtrl');

module.exports = (router) => {
    router
        .route('/init-connection')
        .post(gameCtrl.addPlayer);
}