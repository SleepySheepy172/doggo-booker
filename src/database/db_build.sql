-- BUILD THE SCHEMA: A TEMPLATE FOR YOUR HOW YOUR DATABASE WILL STORE DATA
-- transaction: everything or nothing between BEGIN and COMMIT runs
BEGIN;

-- remove the database to save the updated version
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS bookings_id_seq CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS users_id_seq CASCADE;

-- create table USERS
CREATE TABLE users (
  -- add in the serial
  id SERIAL PRIMARY KEY,
  -- add in the first name
  first_name VARCHAR(20) NOT NULL,
  -- add in the last name
  last_name VARCHAR(20) NOT NULL,
  -- add in the contact number
  contact VARCHAR(13) NOT NULL,
  -- add in an unique email
  email TEXT UNIQUE NOT NULL,
  -- add in the hashed password
  password TEXT NOT NULL
);

-- create table BOOKINGS
CREATE TABLE bookings (
  -- add in the serial
  id SERIAL PRIMARY KEY,
  -- add in foreign key from users table (id)
  user_id INTEGER REFERENCES users (id) NOT NULL,
  -- set data type for the start time
  start_time TIMESTAMP NOT NULL DEFAULT now(),
  -- set data type for the end time
  end_time TIMESTAMP NOT NULL DEFAULT now(),
  -- set data type for the
  booking BOOL DEFAULT true NOT NULL
);

-- insert data into users table
INSERT INTO users (first_name, last_name, contact, email, password) VALUES
('Emma', 'Ogden', '07483928644', 'emma@ogden.com', '$2a10hmsqmbvAqIt5QBM0.EQ7h.PnMOQ4c6yqGCB.o.AhQWfzjbLvp0JJS'),
('Artemis', 'Gause', '07346596378', 'artemis@gause.com','$2a10l0N1sP9AaKlPMJ/bmyGlv.cVmDsX6G8SFhgZKMMQNTyaoOXQDiK6W'),
('Nathalie', 'Jonsson', '07930287364', 'nathalie@jonsson.com', '$2a$10$JbC92brXsw1xDd1/0sagSeX24lCya1zEcQDaNRRAFrSlzaT5perci'),
('Martin', 'Gaston', '07483928644', 'martin@gaston.com','$2a10T/tDyqlYxFFdvMED3TdI5OZMzgkM/EqDnM/1XT6xOrvh43NYe9DWC'),
('Jessie', 'Beech', '07378498256', 'jessie@beech.com','$2a10Vv7TxCaAcekqFtbhkUmOVeYqmWnmv9YRXg3FQYWvWNDIK3BZ/ywKu'),
('Joe', 'Friel', '07930287364', 'joe@friel.com', '$2a$10$23FTtfJQbJwwoKc5bQ01eegGng9K2MCSqU9o4NKd5mpdJkk04gpLy');

-- insert into bookings (Michael's set available date)
INSERT INTO bookings (user_id, start_time, end_time, booking) VALUES
(1, '2018-08-20T11:00', '2018-08-20T19:00', false),
(1, '2018-08-21T11:00', '2018-08-21T19:00', false),
(1, '2018-08-22T11:00', '2018-08-22T19:00', false),
(1, '2018-08-23T11:00', '2018-08-23T19:00', false),
(1, '2018-08-24T11:00', '2018-08-24T19:00', false);

-- insert data into BOOKINGS (people's bookings)
INSERT INTO bookings (user_id, start_time, end_time, booking) VALUES
(2, '2018-08-21T12:00', '2018-08-21T14:00', true),
(2, '2018-08-21T15:00', '2018-08-21T16:00', true),
(3, '2018-08-21T17:00', '2018-08-21T18:00', true),
(2, '2018-08-23T11:00', '2018-08-23T12:00', true),
(3, '2018-08-23T13:00', '2018-08-23T14:00', true),
(4, '2018-08-24T15:00', '2018-08-24T16:00', true);

COMMIT;
