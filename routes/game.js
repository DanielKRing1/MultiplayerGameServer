const { initUser } = require('../controllers/gameCtrl').init();

module.exports = (router) => {
    router
        .route('/init-user')
        .post(initUser);
}