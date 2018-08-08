-- BUILD THE SCHEMA: A TEMPLATE FOR YOUR HOW YOUR DATABASE WILL STORE DATA
-- transaction: everything or nothing between BEGIN and COMMIT runs
BEGIN;

-- create table DAYS
CREATE TABLE days (
  -- add in the serial id
  id SERIAL PRIMARY KEY,
  -- set the datatype for the date, cannot be empty
  date1 TIMESTAMP NOT NULL
);

-- create table BOOKINGS
CREATE TABLE bookings (
  -- add in the serial
  id SERIAL PRIMARY KEY,
  -- set the foreign key referencing the DAYS table
  day_id INTEGER REFERENCES days(id),
  -- set data type for text, cannot be empty
  name VARCHAR(50) NOT NULL,
  -- set data type for the contact number
  contact INTEGER NOT NULL,
  -- set data type for the start time
  start_time INTEGER NOT NULL,
  -- set data type for the end time
  end_time INTEGER NOT NULL,
);

-- insert data into DAYS
INSERT INTO days (date1) VALUES
-- populate database epoch timestamps: 8 Aug, 9 Aug, 10 Aug
(1533735730),
(1533822130),
(1533908530);

-- insert data into BOOKINGS
INSERT INTO bookings (name, contact, start_time, end_time) VALUES
('Emma', '07483928644', '10:00', '11:30');
('Artemis', '07378498256', '13:00', '13:30');
('Nathalie', '079302873645', '15:00', '16:30');

COMMIT;
