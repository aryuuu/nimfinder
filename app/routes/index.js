const express = require('express');
const studentHandler = require('app/handlers/student');

const app = express();

app.get('/nim/:id', (req, res, next) => {
  res.json({ message: 'Hello world'});
});

app.get('/', async (req, res, next) => {
  const result = await studentHandler.getStudents(req.query);

  res.json({ data: result });
});

app.all('*', (req, res) => {
  res.status(400).json({ message: 'not found :('});
})

module.exports = app;

