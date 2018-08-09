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

function getBookings(start, end) {
  url = '/get-bookings?start=' + start + '&end=' + end;
  request(url, function(err, data){
    if (err) return console.log(err);
    removeChildren('bookings-list');
    var bookings = JSON.parse(data);
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
  if (placeholder !== undefined) element.placeholder = placeholder;
  parent.appendChild(element);
}

function renderForm(date) {
  removeChildren('booking-form');
  var form = document.createElement('form');
  form.classList.add('form');
  form.action = '/make-booking';
  form.method = 'POST';
  bookingForm.appendChild(form);
  addFormElement(form, 'form-date', 'hidden', 'date', date);
  addFormElement(form, 'name', 'text', 'name', '', 'Snoopy');
  addFormElement(form, 'contact', 'text', 'contact', '', '07654321012');
  addFormElement(form, 'start-time', 'time', 'start-time', '');
  addFormElement(form, 'end-time', 'time', 'end-time', '');
  var submit = document.createElement('button');
  submit.type = 'submit';
  submit.name = 'submit';
  submit.id = 'submit';
  submit.innerText = 'Submit';
  form.appendChild(submit);
}

// pick up database data on load
//   [ { start_time: 2018-08-11T13:46:57.417Z,
//        end_time: 2018-08-11T14:47:55.129Z } ]
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
