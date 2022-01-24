const express = require('express');
const app = express();
const PORT = 8080;
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
  const id = req.params.id || 2;

  let result = await db.getReviews(page, count, id);
  res.status(200).send(result);
});

app.get('/reviews/meta', async (req, res) => {
  const id = req.params.id || 2;

  let result = await db.getMeta(id);
  res.status(200).send(result);
});

app.post('/reviews', async (req, res) => {
  const { photos, characteristics } = req.body;

  let result = await db.postReview(req.body);
  res.status(200).send(result);
    .then(({rows}) => {
      let id = rows[0].id;
      let photoMap = photos.map((photo) => {
        return db.postPhotos(photo, id);
      });
      return Promise.all(photoMap);
    })
    .then(() => {

    })
});



