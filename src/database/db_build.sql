-- BUILD THE SCHEMA: A TEMPLATE FOR YOUR HOW YOUR DATABASE WILL STORE DATA
-- transaction: everything or nothing between BEGIN and COMMIT runs
BEGIN;

-- remove the database to save the updated version
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS bookings_id_seq CASCADE;

-- create table BOOKINGS
CREATE TABLE bookings (
  -- add in the serial
  id SERIAL PRIMARY KEY,
  -- set data type for text, cannot be empty
  name VARCHAR(50) NOT NULL,
  -- set data type for the contact number
  contact VARCHAR(13) NOT NULL,
  -- set data type for the start time
  start_time TIMESTAMP NOT NULL DEFAULT now(),
  -- set data type for the end time
  end_time TIMESTAMP NOT NULL DEFAULT now(),
  -- set data type for the
  booking BOOL DEFAULT true NOT NULL
);


-- insert availability into bookings
INSERT INTO bookings (name, contact, start_time, end_time, booking) VALUES
('Michael', '07972767878', '2018-08-18T11:00', '2018-08-18T19:00', false),
('Michael', '07972767878', '2018-08-19T11:00', '2018-08-19T19:00', false),
('Michael', '07972767878', '2018-08-20T11:00', '2018-08-20T19:00', false),
('Michael', '07972767878', '2018-08-21T11:00', '2018-08-21T19:00', false),
('Michael', '07972767878', '2018-08-22T11:00', '2018-08-22T19:00', false);

-- insert data into BOOKINGS
INSERT INTO bookings (name, contact, start_time, end_time, booking) VALUES
('Emma', '07483928644', '2018-08-18T12:00', '2018-08-18T14:00', true),
('Artemis', '07378498256', '2018-08-19T15:00', '2018-08-19T16:00', true),
('Nathalie', '07930287364', '2018-08-19T17:00', '2018-08-19T18:00', true),
('Martin', '07483928644', '2018-08-20T11:00', '2018-08-20T12:00', true),
('Jessie', '07378498256', '2018-08-20T13:00', '2018-08-20T14:00', true),
('Joe', '07930287364', '2018-08-20T15:00', '2018-08-20T16:00', true);

COMMIT;
