DROP TABLE IF EXISTS reviews, review_info, metadata, ratings, characteristics  CASCADE

-- psql -d reviews -f database/SCHEMA.sql

-- Reviews --

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  review_id INTEGER
);

-- Review Info --

CREATE TABLE IF NOT EXISTS review_info (
  id INTEGER PRIMARY KEY,
  review_id INTEGER,
  rating INTEGER,
  summary TEXT,
  recommend BOOLEAN,
  response TEXT,
  body TEXT,
  review_date DATE,
  reviewer_name TEXT,
  helpfulness INTEGER,
  photos VARCHAR(400)
);

-- Metadata --

CREATE TABLE IF NOT EXISTS metadata (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  ratings INTEGER,
  recommend INTEGER,
  characteristics VARCHAR(250)
);

-- Ratings --

CREATE TABLE IF NOT EXISTS ratings (
  id INTEGER PRIMARY KEY,
  star_rating INTEGER
);

-- Characteristics --

CREATE TABLE IF NOT EXISTS characteristics (
  id INTEGER PRIMARY KEY,
  characteristics TEXT
);