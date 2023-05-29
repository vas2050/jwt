const Router = require('express-promise-router');

const api = require('./api');
const auth = require('./auth');

const router = new Router();

router.use('/api', api);
router.use('/auth', auth);

module.exports = router;
