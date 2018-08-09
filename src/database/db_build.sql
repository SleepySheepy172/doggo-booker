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

-- insert data into BOOKINGS
INSERT INTO bookings (name, contact, start_time, end_time, booking) VALUES
('Emma', '07483928644', '2018-08-08T14:46:57.417Z', '2018-08-08T15:47:55.129Z', true),
('Artemis', '07378498256', '2018-09-08T14:46:57.417Z', '2018-09-08T15:47:55.129Z', false),
('Nathalie', '07930287364', '2018-11-08T14:46:57.417Z', '2018-11-08T15:47:55.129Z', false);

COMMIT;
