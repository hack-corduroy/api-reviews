DROP TABLE IF EXISTS characteristic_reviews, reviews, reviews_photos, characteristics;

-- psql -d reviews -f database/Schema.sql

-- Characteristic Reviews --

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id INTEGER PRIMARY KEY,
  characteristic_id INTEGER,
  review_id INTEGER,
  value INTEGER
);

COPY characteristic_reviews FROM '/Users/meganwolf/HackReactor/SDC Project/api-reviews/csv/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
CREATE INDEX review_idx on characteristic_reviews (review_id);

-- Reviews --

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  rating INTEGER,
  review_date DATE,
  summary VARCHAR,
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(50),
  reviewer_email VARCHAR(50),
  response VARCHAR,
  helpfulness INTEGER
);

COPY reviews FROM '/Users/meganwolf/HackReactor/SDC Project/api-reviews/csv/reviews.csv' DELIMITER ',' CSV HEADER;
CREATE INDEX product_idx on reviews (product_id);

-- Review Photos --

CREATE TABLE IF NOT EXISTS reviews_photos (
  id INTEGER PRIMARY KEY,
  review_id INTEGER,
  url VARCHAR
);

COPY reviews_photos FROM '/Users/meganwolf/HackReactor/SDC Project/api-reviews/csv/reviews_photos.csv' DELIMITER ',' CSV HEADER;
CREATE INDEX reviewPhoto_idx on reviews_photos (review_id);

-- Characteristics --

CREATE TABLE IF NOT EXISTS characteristics (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR(50)
);

COPY characteristics FROM '/Users/meganwolf/HackReactor/SDC Project/api-reviews/csv/characteristics.csv' DELIMITER ',' CSV HEADER;
CREATE INDEX productChar_idx on characteristics (product_id);

