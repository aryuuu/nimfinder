const config = require('app/configs');
const express = require('express');
const router = require('app/routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(router);

app.listen(config.PORT, () => {
  console.log(`${config.SERVICE_NAME} is listening on port ${config.PORT}`);
})

module.exports = app;