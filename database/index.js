require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({ connectionString: connectionString });

const db = {
  getReviews: async (page = 1, limit = 50, id = 2) => {
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
  }

  // getMeta: async (id) => {
  //   const sql = `
  //   SELECT *
  //   FROM reviews
  //   WHERE product_id = ${id} AND id > ${start} AND id <= ${end}
  //   order by helpfulness
  //   `;
  //   let data = await pool.query(sql);
  //   return data.rows;
  // }
}

module.exports = { pool, db };