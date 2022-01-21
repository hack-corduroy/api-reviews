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
  const page = parseInt(req.query.page) || 1;
  const count = parseInt(req.query.count) || 50;
  const id = req.params.id|| 2;

  let result = await db.getReviews(page, count, id);
  res.status(200).send(result);
});

app.get('/reviews/meta', async (req, res) => {
  const id = req.params.id|| 2;

  let result = await db.getMeta(id);
  res.status(200).send(result);
});

app.post('/reviews', async (req, res) => {
  let result = await db.postReview(req);
  res.status(200).send(result);
})



