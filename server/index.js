const express = require('express');
const app = express();
const PORT = 3000;
const { db } = require('../database/index.js');

app.get('/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(PORT, () => {
  console.log('Server is running at http://localhost:' + PORT);
});

app.get('/reviews', async (req, res) => {
  let result = await db.getReviews(page = 1, count = 50, id = 2);
  res.status(200).send(result);
});

app.get('/reviews/meta', async (req, res) => {
  let result = await db.getMeta(id = 2);
  res.status(200).send(result);
});

app.post('/reviews', async (req, res) => {

})



