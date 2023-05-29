const Router = require('express-promise-router');
const { signToken, verifyToken } = require('../../lib/auth/utils');

const router = new Router();

router.get('/token', (req, res, next) => {
   signToken()
      .then((token) => res.json({ token }))
      .catch(next);
});

router.get('/token/verify', (req, res, next) => {
   const { authorization: auth } = req.headers;
   const token = auth.split(' ')[1];

   verifyToken(token)
      .then((payload) => res.json({ payload }))
      .catch(next);
});

module.exports = router;
