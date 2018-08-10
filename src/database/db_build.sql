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
('Michael', '07972767878', '2018-08-10T11:00', '2018-08-10T19:00', false),
('Michael', '07972767878', '2018-08-12T11:00', '2018-08-12T19:00', false),
('Michael', '07972767878', '2018-08-14T11:00', '2018-08-14T19:00', false);

-- insert data into BOOKINGS
INSERT INTO bookings (name, contact, start_time, end_time, booking) VALUES
('Emma', '07483928644', '2018-08-10T12:00', '2018-08-10T14:00', true),
('Artemis', '07378498256', '2018-08-10T15:00', '2018-08-10T16:00', true),
('Nathalie', '07930287364', '2018-08-10T17:00', '2018-08-10T18:00', true),
('Martin', '07483928644', '2018-08-12T11:00', '2018-08-12T12:00', true),
('Jessie', '07378498256', '2018-08-12T13:00', '2018-08-12T14:00', true),
('Joe', '07930287364', '2018-08-12T15:00', '2018-08-12T16:00', true);

COMMIT;
