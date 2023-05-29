const cors = require('cors');
const dotenv = require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

const { errorHandler, logger, graphqlServer } = require('./middleware');
const routes = require('./routes');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));

app.use((req, res, next) => {
   const { url, method, params, query, body } = req;
   logger.info(`${method} ${url}, params: ${JSON.stringify(params)}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`);

   // intercept the response
   const send = res.send;
   res.send = c => {
      logger.info(`${method} ${url}, status: ${res.statusCode}, response: ${c}`);
      res.send = send;
      return res.send(c);
   }

   next();
});

app.use('/', routes);

graphqlServer(app, (err) => {
   if (err) {
      logger.error('GraphQL Server Failed');
      process.exit(0);
   }

   const PORT = process.env.PORT;
   const options = {
     key: fs.readFileSync(path.join(__dirname, '../cert', process.env.PRIVATE_KEY_FILE)),
     cert: fs.readFileSync(path.join(__dirname, '../cert', process.env.PUBLIC_KEY_FILE))
   };

   https.createServer(options, app)
     .listen(PORT, () => console.log(`https [graphQL] server started @ ${PORT}`));

   app.use((req, res) => {
      logger.error(new Error('Not Found'));
      res.status(404).send('Not Found');
   });

   app.use(errorHandler);
});
