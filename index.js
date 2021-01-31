require('app-module-path').addPath(`${__dirname}`);
require('dotenv').config();
const config = require('app/configs');

const mongoose = require('mongoose');

mongoose
  .connect(
    `${config.MONGO_HOST}/${config.MONGO_DB}`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to mongodb server');
    require('app');
  })
  .catch(err => {
    console.log(err);
  })