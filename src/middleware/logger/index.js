const winston = require('winston');

const logConfiguration = {
   transports: [
      new winston.transports.Console({ level: 'warn' }),
      new winston.transports.File({ levels: ['info', 'error'], filename: 'logs/app.log' }),
   ],
   format: winston.format.combine(
      //winston.format.label({ label: `Label` }),
      winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      winston.format.align(),
      winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      //winston.format.json()
   )
};

module.exports = winston.createLogger(logConfiguration);
