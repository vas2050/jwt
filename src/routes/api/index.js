const Router = require('express-promise-router');
const { verifyTokenHandler } = require('../../lib/auth/utils');

const router = new Router();

router.get('/hello', verifyTokenHandler, (req, res) => {
   res.json({ token: 'valid', say: 'hello!' });
});

module.exports = router;
