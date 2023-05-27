const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const routes = require('./routes');
const { SimpleErrorHandler } = require('./exception');

const app = express();

app.use(cors('*'));
app.use('/', routes);

const PORT = process.env.PORT;

const options = {
  key: fs.readFileSync(path.join(__dirname, '../cert/localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../cert/localhost.pem'))
};

https.createServer(options, app)
  .listen(PORT, () => console.log(`https server started @ ${PORT}`));

app.use((req, res) => {
   res.status(404).send('<font color="red">Page Not Found</font>');
});

app.use(SimpleErrorHandler);
