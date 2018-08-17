# doggo-booker 2.0 :dog: [![travis](https://travis-ci.com/SleepySheepy172/doggo-booker.svg?branch=master)](https://travis-ci.org/SleepySheepy172/doggo-booker)
> An app to reserve times with Mackerel the puppy!

<img src="https://media.giphy.com/media/pmTlQTEbN6oM/giphy.gif" style="width:100%;margin-bottom:1em">

Heroku: https://mackerel-time.herokuapp.com/ (it does work! 🤞🏼)

## Local installation

* Clone this repo
* Run `npm install`
* Make sure you have [postgresql](https://www.postgresql.org/download/) installed.
* Create a local postgresql database on your system.
* Create a user and grant them all privileges on the database.
* Set the user as owner of the database
* Create file config.env in the project's root folder, and add the following environment variables, substituting your chosen database name, user name and password in the URL:
```
ENVIRONMENT = TEST
USERS_DB_URL = postgres://USER:PASSWORD@localhost:5432/DATABASE_NAME
```
* `npm test` to see the tests, build DB tables and populate with dummy data.
* `npm start` to launch the server
* Go to http://localhost:3000 to see the magic happen

**N.B. You do need to run the tests first in order to create the database schema. The project won't work without this step. Yes, we know this isn't necessarily the ideal method.**

Enjoy!
