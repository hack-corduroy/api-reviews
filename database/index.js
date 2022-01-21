require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({ connectionString: connectionString });

const db = {
  getReviews: async (page, limit, id) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const productId = id
    const sql = `
    SELECT reviews.id AS review_id,
    reviews.rating, reviews.summary, reviews.recommend, reviews.response,
    reviews.body, reviews.review_date as date,
    reviews.reviewer_name, reviews.helpfulness,
    json_agg(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url)) AS photos
    FROM reviews LEFT JOIN reviews_photos ON reviews_photos.review_id = reviews.id
    WHERE product_id= ${productId} AND reviews.reported=false AND reviews.id > ${start} AND reviews.id <= ${end} GROUP BY reviews.id
    `;
    let data = await pool.query(sql);
    return data.rows;
  },

  getMeta: async (id) => {
    const sql = `
    SELECT
    json_build_object(
      1, (SELECT COUNT(reviews.rating) FROM reviews WHERE reviews.product_id = ${id} AND reviews.rating = 1),
      2, (SELECT COUNT(reviews.rating) FROM reviews WHERE reviews.product_id = ${id} AND reviews.rating = 2),
      3, (SELECT COUNT(reviews.rating) FROM reviews WHERE reviews.product_id = ${id} AND reviews.rating = 3),
      4, (SELECT COUNT(reviews.rating) FROM reviews WHERE reviews.product_id = ${id} AND reviews.rating = 4),
      5, (SELECT COUNT(reviews.rating) FROM reviews WHERE reviews.product_id = ${id} AND reviews.rating = 5)
    )ratings,
    json_build_object(
      0, (SELECT COUNT(reviews.recommend) FROM reviews WHERE reviews.product_id = ${id} AND reviews.recommend = false),
      1, (SELECT COUNT(reviews.recommend) FROM reviews WHERE reviews.product_id = ${id} AND reviews.recommend = true)
    )recommended,
    json_object_agg(
      characteristics.name,
        json_build_object(
          'id', characteristics.id,
          'value', (SELECT AVG (CAST(characteristic_reviews.value as Float)) FROM characteristic_reviews
            WHERE characteristic_reviews.characteristic_id = characteristics.id
          )
      )
    )characteristic FROM characteristics WHERE characteristics.product_id = ${id}`;

    let data = await pool.query(sql);
    return data.rows;
  },

  postReview: async (review) => {
    const sql = `INSERT INTO reviews
    (product_id, rating, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness)
    VALUES (${review.product_id}, ${review.rating}, '${review.summary}', '${review.body}', ${review.recommend}, false, '${review.name}', '${review.email}', 0)
    RETURNING id `;

    let data = await pool.query(sql);
    return data;
  }
}

module.exports = { pool, db };