const Router = require('express-promise-router');
const token = require('./token');
const api = require('./api');

const router = new Router();

router.use('/token', token);
router.use('/api', api);

module.exports = router;
