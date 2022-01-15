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
  let result = await db.getReviews();
  res.status(200).send(result);
});

// app.get('/reviews/meta', (req, res) => {
//   db.getMeta(req.query, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(404);
//     } else {
//       res.status(200).send(result);
//     }
//   });
// });

