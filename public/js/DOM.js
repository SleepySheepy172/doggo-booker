/* eslint-disable */

// show available dates on load
const availableDates = document.getElementById('available-dates');
// show an intro before use picks a date
const introText = document.getElementById('intro');
// grabs all avaliable dates buttons
const dateButtons = document.getElementsByTagName('button');
// hide form until usre has clicked a date
const inputForm = document.getElementsByTagName('form');

const bookingsTable = document.getElementById('bookings-table');

const bookingForm = document.getElementById('booking-form');

function request(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      cb("error" + xhr.responseType);
    };
  }
  xhr.open("GET", url, true);
  xhr.send();
}

function removeChildren(id) {
  element = document.getElementById(id);
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}

function addTD(parent, text) {
  var e = document.createElement('td');
  e.innerText = text;
  parent.appendChild(e);
}

function addTH(parent, text) {
  var e = document.createElement('th');
  e.scope = 'col';
  var h4 = document.createElement('h4');
  h4.innerText = text;
  e.appendChild(h4)
  parent.appendChild(e);
}

var bookinglist = {};

function getBookings(start, end) {
  url = '/get-bookings?start=' + start + '&end=' + end;
  request(url, function(err, data){
    if (err) return console.log(err);
    removeChildren('bookings-table');
    var bookings = JSON.parse(data);
    bookingState = bookings;
    if (bookings.length) {
      var row = document.createElement('tr');
      addTH(row, 'Name');
      addTH(row, 'Start');
      addTH(row, 'End');
      bookingsTable.appendChild(row);
    bookings.forEach(function(booking){
      var row = document.createElement('tr');
      addTD(row, booking.name);
      //addTD(row, booking.contact);
      addTD(row, booking.start_time);
      addTD(row, booking.end_time);
      bookingsTable.appendChild(row);
      });
    } else {
      var row = document.createElement('tr');
      addTD(row, 'No bookings found.');
      bookingsTable.appendChild(row);
    }
  });
}

function addFormElement(parent, id, type, name, value, placeholder) {
  var label = document.createElement('label');
  label.innerText = name;
  var element = document.createElement('input');
  element.type = type;
  element.id = id;
  element.name = name;
  element.value = value;
  element.required = true;
  if (placeholder !== undefined) element.placeholder = placeholder;
  label.appendChild(element);
  parent.appendChild(label);
}

function makeBooking(querystring, cb) {
  var XHR = new XMLHttpRequest();

  // Define what happens on successful data submission
  XHR.addEventListener('load', function(event) {
    cb();
  });

  // Define what happens in case of error
  XHR.addEventListener('error', function(event) {
    console.log('Oops! Something went wrong.');
  });

  // Set up our request
  XHR.open('POST', '/make-booking');

  // Send our FormData object; HTTP headers are set automatically
  XHR.send(querystring);
}

function validateForm(name, contact, startTime, endTime) {
  //check that name is alphabetical
  var nameRegex = /[^a-zA-Z ]/;
  if (nameRegex.test(name)) {
    alert('Please enter alphabetical characters only in name');
    return false;
  }
  //check that phone number is valid
  if (contact.indexOf(0) !== 0 || contact.length !== 11) {
    alert('please enter a valid UK phone number');
    return false;
  }
  // check that requested booking does not overlap existing booking
  bookingState.forEach(function(booking){
    console.log(booking);
    if (startTime >= booking.start_time && startTime<= booking.end_time) {
      alert('Please select an available start time')
      return false
    } else if (endTime >= booking.start_time && endTime <= booking.end_time) {
      alert('Please select an available end time')
      return false
    }
  })
  // check that end time is after start time
  if (startTime > endTime) {
    alert('Please choose an end time after your start time');
    return false;
  }
  if (startTime < '10:00:00' || endTime > '18:00:00') {
    alert('Mackerel is only available between 10am and 6pm');
    return false;
  }
  return true;
}

function renderForm(date) {
  removeChildren('booking-form');
  var form = document.createElement('form');
  form.id = 'form'
  form.classList.add('form');
  form.action = '/make-booking';
  form.method = 'POST';
  bookingForm.appendChild(form);
  addFormElement(form, 'form-date', 'hidden', 'date', date);
  addFormElement(form, 'name', 'text', 'name', '', 'Snoopy');
  addFormElement(form, 'contact', 'number', 'contact', '', '07654321012');
  addFormElement(form, 'start-time', 'time', 'start-time', '');
  addFormElement(form, 'end-time', 'time', 'end-time', '');
  var submit = document.createElement('button');
  submit.type = 'submit';
  submit.name = 'submit';
  submit.id = 'submit';
  submit.innerText = 'Submit';
  form.appendChild(submit);
  form.addEventListener('submit', function(event){
    event.preventDefault();
    var date = document.getElementById('form-date').value;
    var name = document.getElementById('name').value;
    var contact = document.getElementById('contact').value;
    var startTime = document.getElementById('start-time').value;
    var endTime = document.getElementById('end-time').value;
    if (validateForm(name, contact, startTime, endTime)) {
      var data = 'date=' + date + '&name=' + name + '&contact=' + contact + '&start-time=' + startTime + '&end-time=' + endTime;
      makeBooking(data, function(){
        getBookings(date + 'T10:00:00.000Z', date + 'T18:00:00.000Z');
      });
      renderForm(date);      
    }
  });
}

/* parent, id, type, name, value, placeholder */

function renderRegistration(date) {
  removeChildren('booking-form');
  var form = document.createElement('form');
  form.id = 'login-form'
  form.classList.add('login-form');
  form.action = '/login';
  form.method = 'POST';
  bookingForm.appendChild(form);
  //add heading to form
  var heading = document.createElement('h4');
  heading.innerText = 'Register to make bookings';
  form.appendChild(heading);
  //addFormElement(form, 'form-date', 'hidden', 'date', date);
  addFormElement(form, 'first-name', 'text', 'First Name', '', 'Snoopy');
  addFormElement(form, 'last-name', 'text', 'Last Name', '', 'Beagle');
  addFormElement(form, 'contact', 'number', 'Phone', '', '07654321012');
  addFormElement(form, 'password', 'password', 'Password', '');
  addFormElement(form, 'password-2', 'password', 'Confirm Password', '');
  var submit = document.createElement('button');
  submit.type = 'submit';
  submit.name = 'submit';
  submit.id = 'submit';
  submit.innerText = 'Submit';
  form.appendChild(submit);
  form.addEventListener('submit', function(event){
    event.preventDefault();
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var contact = document.getElementById('contact').value;
    var password = document.getElementById('password-1').value;
    var password2 = document.getElementById('password-2').value;
    if (validateRegistration(firstName, lastName, contact, password, password2)) {
      var data = 'first-name=' + firstName + 'last-name=' + lastName + '&contact=' + contact + '&password=' + password;
      register(data, function(){
        //renderForm(date);
      });  
    }
  });
}

// changed /get-availability request - function needs to return data to show
// if user is logged in, as well as the days available.

window.addEventListener("load", function (e) {
  console.log('I have loaded')
  // grab data here
  request('/get-availability', function(err, data){
    if (err) return console.log('error retrieving data');
    removeChildren('available-dates');
    JSON.parse(data).forEach(function(day){
      var button = document.createElement('button');
      button.addEventListener('click', function(){
        getBookings(day.start_time, day.end_time);
        if (data.logged_in === true) {
          renderForm(day.start_time.split('T')[0]);
        }
      })
      button.innerText = day.start_time.split('T')[0].split('-')[2];
      availableDates.appendChild(button);
    })
  })
});
