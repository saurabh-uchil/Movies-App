DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS ratings;
CREATE TABLE IF NOT EXISTS ratings(
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL,
movie_id VARCHAR(60) NOT NULL,
rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
CONSTRAINT fk_usersFOREIGN KEY(user_id)REFERENCES users(id)
);

/* Not needed, We only need a ratings table that has rating_id(Auto generated), userid, movieid, rating 
DROP TABLE IF EXISTS movies;
CREATE TABLE IF NOT EXISTS movies (
  movie_id SERIAL PRIMARY KEY,
  movie_title VARCHAR(255) NOT NULL,
  movie_year INTEGER NOT NULL,
  movie_time INTEGER NOT NULL,
  movie_lang VARCHAR(255) NOT NULL,
  movie_rel DATE,
  movie_rel_country VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS rating;
CREATE TABLE IF NOT EXISTS rating(
  movie_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  star_rate FLOAT NOT NULL,
  total_rating INTEGER NOT NULL,
  CONSTRAINT fk_users
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
        ON DELETE CASCADE,
   CONSTRAINT fk_movies
   FOREIGN KEY(movie_id)
    REFERENCES movies(movie_id)
        ON DELETE CASCADE
);

DROP TABLE IF EXISTS genres;
CREATE TABLE IF NOT EXISTS genres(
    gen_id SERIAL PRIMARY KEY,
    gen_title VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS moviegenres;
CREATE TABLE IF NOT EXISTS moviegenres(
    movie_id INTEGER NOT NULL,
    gen_id INTEGER NOT NULL,
    CONSTRAINT fk_genres
  FOREIGN KEY(gen_id)
    REFERENCES genres(gen_id)
        ON DELETE CASCADE
);

DROP TABLE IF EXISTS actor;
CREATE TABLE IF NOT EXISTS actor(
    actor_id SERIAL PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS moviecast;
CREATE TABLE IF NOT EXISTS moviecast(
    actor_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    role VARCHAR(255) NOT NULL,
    CONSTRAINT fk_actor
        FOREIGN KEY(actor_id)
            REFERENCES actor(actor_id),
    CONSTRAINT fk_movies
        FOREIGN KEY(movie_id)
            REFERENCES movies(movie_id)
            ON DELETE CASCADE
);

DROP TABLE IF EXISTS director;
CREATE TABLE IF NOT EXISTS director(
    director_id SERIAL PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS moviedirected;
CREATE TABLE IF NOT EXISTS moviedirected(
    director_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    CONSTRAINT fk_director
  FOREIGN KEY(director_id)
    REFERENCES director(director_id),
    CONSTRAINT fk_movies
  FOREIGN KEY(movie_id)
    REFERENCES movies(movie_id)
        ON DELETE CASCADE
);

 */
