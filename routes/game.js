const gameCtrl = require('../controllers/gameCtrl').init();

module.exports = (router) => {
    router
        .route('/init-connection')
        .post(gameCtrl.addPlayer);
}