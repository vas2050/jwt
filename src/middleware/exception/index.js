const logger = require('../logger');

const errorHandler = (err, req, res, next) => {
   const errStatus = err.statusCode || 500;
   const error = {
      success: false,
      status: errStatus,
      message: err.message || 'something went wrong',
      stack: process.env.NODE_ENV === 'dev' ? JSON.stringify(err.stack) : {}
   };

   logger.error(error);

   res.status(errStatus).json({error});
};

module.exports = errorHandler;
