// show available dates on load
const availableDates = document.getElementById('available-dates');
// show an intro before use picks a date
const introText = document.getElementById('intro');
// grabs all avaliable dates buttons
const dateButtons = document.getElementsByTagName('button');
// hide form until usre has clicked a date
const inputForm = document.getElementsByTagName('form');

const bookingsList = document.getElementById('bookings-list');

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

function addListItem(parent, text) {
  var li = document.createElement('li');
  li.innerText = text;
  parent.appendChild(li);
}

var bookinglist = {};

function getBookings(start, end) {
  url = '/get-bookings?start=' + start + '&end=' + end;
  request(url, function(err, data){
    if (err) return console.log(err);
    removeChildren('bookings-list');
    var bookings = JSON.parse(data);
    bookingState = bookings;
    if (bookings.length) {
    bookings.forEach(function(booking){
      var item = document.createElement('li');
      var details = document.createElement('ul');
      item.appendChild(details);
      addListItem(details, booking.name);
      addListItem(details, booking.contact);
      addListItem(details, booking.start_time);
      addListItem(details, booking.end_time);
      bookingsList.appendChild(item);
      });
    } else {
      addListItem(bookingsList, 'No bookings found.');
    }
  });
}

function addFormElement(parent, id, type, name, value, placeholder) {
  var element = document.createElement('input');
  element.type = type;
  element.id = id;
  element.name = name;
  element.value = value;
  element.required = true;
  if (placeholder !== undefined) element.placeholder = placeholder;
  parent.appendChild(element);
}

function makeBooking(querystring) {
  var XHR = new XMLHttpRequest();

  // Define what happens on successful data submission
  XHR.addEventListener('load', function(event) {
    alert('Yeah! Data sent and response loaded.');
  });

  // Define what happens in case of error
  XHR.addEventListener('error', function(event) {
    alert('Oops! Something went wrong.');
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
      makeBooking(data);
    }
  });
}

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
        renderForm(day.start_time.split('T')[0]);
      })
      button.innerText = day.start_time.split('T')[0].split('-')[2];
      availableDates.appendChild(button);
    })
  })
});
