const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, '../../../../cert/localhost-key.pem'));
const publicKey = fs.readFileSync(path.join(__dirname, '../../../../cert/localhost.pem'));

const signToken = () => {
   const payload = {
      user: 'user123',
      note: 'hello 1, 2, 3',
      time: Date.now()
   };

   const options = {
      expiresIn: '1d',
      algorithm: 'RS256'
   };

   return new Promise((resolve, reject) => {
      jwt.sign(payload, privateKey, options, (err, token) => {
         if (err) {
            return reject(err);
         }

         resolve(token);
      });
   });
};

const verifyToken = (token) => {
   /*
   const options = {
      algorithms: 'RS256'
   };
   */

   return new Promise((resolve, reject) => {
      jwt.verify(token, publicKey, (err, payload) => {
         if (err) {
            return reject(err);
         }

         resolve(payload);
      });
   });
};

const verifyTokenHandler = (req, res, next) => {
   const { authorization: auth } = req.headers;
   const token = auth.split(' ')[1];

   verifyToken(token)
      .then(() => next())
      .catch((err) => res.status(403).json({ message: 'invalid token' }));
};

module.exports = {
   signToken,
   verifyToken,
   verifyTokenHandler
};
