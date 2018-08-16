/* eslint-disable */

// until logging in works, use variable to change views
const logged_in = false;

const availableDates = document.getElementById('date-buttons');
const dateButtons = document.getElementsByTagName('button');
const inputForm = document.getElementsByTagName('form');
const bookingsTable = document.getElementById('bookings-table');
const bookingForm = document.getElementById('booking-form');

// GET request function
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

// POST request function
function requestPost(url, querystring, cb) {
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
  XHR.open('POST', url);
  // Send our FormData object; HTTP headers are set automatically
  XHR.send(querystring);
}

// use POST function to access different 
function makeBooking(querystring, cb) {
  requestPost('/make-booking', querystring, cb);
}

function register(querystring, cb) {
  requestPost('/register', querystring, cb);
}

function login(querystring, cb) {
  requestPost('/login', querystring, cb);
}

// remove all children from a node with given ID
function removeChildren(id) {
  element = document.getElementById(id);
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}

// add a TD to a parent row
function addTD(parent, text) {
  var e = document.createElement('td');
  e.innerText = text;
  parent.appendChild(e);
}

// add a TH to a parent row
function addTH(parent, text) {
  var e = document.createElement('th');
  e.scope = 'col';
  var h4 = document.createElement('h4');
  h4.innerText = text;
  e.appendChild(h4)
  parent.appendChild(e);
}

// retrieve all bookings for given day
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
  var element = document.createElement('input');
  element.type = type;
  element.id = id;
  element.name = name;
  element.value = value;
  element.required = true;
  if (placeholder !== undefined) element.placeholder = placeholder;
  if (type !== 'hidden') {
    var label = document.createElement('label');
    label.innerText = name;
    label.appendChild(element);
    parent.appendChild(label);
  } else {
    parent.appendChild(element);
  }

}

/* TBD: UPDATE VALIDATION FOR EACH FORM */

function validateForm(name, contact, startTime, endTime) {
  //check that name is alphabetical
  // var nameRegex = /[^a-zA-Z ]/;
  // if (nameRegex.test(name)) {
  //   alert('Please enter alphabetical characters only in name');
  //   return false;
  // }
  // //check that phone number is valid
  // if (contact.indexOf(0) !== 0 || contact.length !== 11) {
  //   alert('please enter a valid UK phone number');
  //   return false;
  // }
  // // check that requested booking does not overlap existing booking
  // bookingState.forEach(function(booking){
  //   console.log(booking);
  //   if (startTime >= booking.start_time && startTime<= booking.end_time) {
  //     alert('Please select an available start time')
  //     return false
  //   } else if (endTime >= booking.start_time && endTime <= booking.end_time) {
  //     alert('Please select an available end time')
  //     return false
  //   }
  // })
  // // check that end time is after start time
  // if (startTime > endTime) {
  //   alert('Please choose an end time after your start time');
  //   return false;
  // }
  // if (startTime < '10:00:00' || endTime > '18:00:00') {
  //   alert('Mackerel is only available between 10am and 6pm');
  //   return false;
  // }
  return true;
}

function renderBookingForm(date) {
  removeChildren('booking-form');
  var form = document.createElement('form');
  form.id = 'form'
  form.classList.add('form');
  form.action = '/make-booking';
  form.method = 'POST';
  bookingForm.appendChild(form);
  var h4 = document.createElement('h4');
  h4.innerText = 'Submit booking for this day';
  form.appendChild(h4);
  addFormElement(form, 'form-date', 'hidden', 'date', date);
  addFormElement(form, 'user-id', 'hidden', 'user-id', 2);
  addFormElement(form, 'start-time', 'time', 'start-time', '');
  addFormElement(form, 'end-time', 'time', 'end-time', '');
  var submit = document.createElement('button');
  submit.type = 'submit';
  submit.name = 'submit';
  submit.id = 'submit';
  submit.innerText = 'Submit';
  form.appendChild(submit);
  form.addEventListener('submit', function(event){
    /* UPDATE FUNCTION TO MAKE BOOKING */
    event.preventDefault();
    var date = document.getElementById('form-date').value;
    var id = document.getElementById('user-id').value;
    var startTime = document.getElementById('start-time').value;
    var endTime = document.getElementById('end-time').value;
    if (validateForm(name, contact, startTime, endTime)) {
      var querystring = 'date=' + date + '&user-id=' + id + '&start-time=' + startTime + '&end-time=' + endTime;
      makeBooking(querystring, function(){
        getBookings(date + 'T10:00:00.000Z', date + 'T18:00:00.000Z');
      });
      renderBookingForm(date);    
    }
  });
}

/* CREATE TABBED SECTIONS FOR REGISTER / LOGIN */

function createTabs() {

  // create tablist
  var ul = document.createElement('ul');
  bookingForm.appendChild(ul);

  //create first tab
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.innerText = 'Login';
  a.href = '#login';
  li.appendChild(a);
  ul.appendChild(li);

  // create second tab
  var li2 = document.createElement('li');
  var a2 = document.createElement('a');
  a2.innerText = 'Register';
  a2.href = '#register';
  li2.appendChild(a2);
  ul.appendChild(li2);
  
  // create login tab
  var login = document.createElement('section');
  login.id = "login";
  login.classList.add('tab-section');
  bookingForm.appendChild(login);

  // create register tab
  var registration = document.createElement('section');
  registration.id = "register";
  registration.classList.add('tab-section');
  bookingForm.appendChild(registration);
}

function renderRegistrationForm() {
  var form = document.createElement('form');
  form.id = 'registration-form'
  form.classList.add('registration-form');
  form.action = '/register';
  form.method = 'POST';
  document.getElementById('register').appendChild(form);
  //addFormElement(form, 'form-date', 'hidden', 'date', date);
  addFormElement(form, 'email', 'email', 'Email', '', 'snoopy@peanuts.com');
  addFormElement(form, 'first-name', 'text', 'First Name', '', 'Snoopy');
  addFormElement(form, 'last-name', 'text', 'Last Name', '', 'Brown');
  addFormElement(form, 'phone', 'number', 'Phone', '', '07654321012');
  addFormElement(form, 'password', 'password', 'Password', '');
  addFormElement(form, 'password-2', 'password', 'Confirm Password', '');
  var submit = document.createElement('button');
  submit.type = 'submit';
  submit.name = 'submit';
  submit.innerText = 'Submit';
  form.appendChild(submit);
  form.addEventListener('submit', function(event){
    event.preventDefault();
    var email = document.getElementById('email').value;
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var contact = document.getElementById('contact').value;
    var password = document.getElementById('password-1').value;
    var password2 = document.getElementById('password-2').value;
    if (validateRegistration(email, firstName, lastName, contact, password, password2)) {
      var querystring = 'email=' + email +'first-name=' + firstName + 'last-name=' + lastName + '&contact=' + contact + '&password=' + password;
      register(querystring, function(){
       console.log('registered');
       // what should we do now?
      });  
    }
  });
}

function validateRegistration(email, firstName, lastName, contact, password, password2) {
  // add validation
  return true;
}

function renderLoginForm() {
  var form = document.createElement('form');
  form.id = 'login-form'
  form.classList.add('login-form');
  form.action = '/login';
  form.method = 'POST';
  document.getElementById('login').appendChild(form);
  //addFormElement(form, 'form-date', 'hidden', 'date', date);
  addFormElement(form, 'login-email', 'email', 'Email', '', 'snoopy@peanuts.com');
  addFormElement(form, 'login-password', 'password', 'Password', '');
  var submit = document.createElement('button');
  submit.type = 'submit';
  submit.name = 'submit';
  submit.id = 'submit';
  submit.innerText = 'Submit';
  form.appendChild(submit);
  form.addEventListener('submit', function(event){
    event.preventDefault();
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    if (validateLogin(email, password)) {
      var data = 'email=' + email + '&password=' + password;
      login(data, function(){
        console.log('logged in');
        // need to decide what to do once logged-in successfully - reload page now user has cookie?
      });  
    }
  });
}

function renderLogin() {
  removeChildren('booking-form');
  createTabs();
  renderRegistrationForm();
  renderLoginForm();
  tabify();
}

// changed /get-availability request - function needs to return data to show
// if user is logged in, as well as the days available.

window.addEventListener("load", function (e) {
  console.log('I have loaded')
  // grab data here
  // get-availability also needs to return whether user is logged in
  request('/get-availability', function(err, data){
    if (err) return console.log('error retrieving data');
    removeChildren('date-buttons');
    var count = 0;
    JSON.parse(data).forEach(function(day){
      if (count == 0) {
        getBookings(day.start_time, day.end_time);
        if (logged_in === true) {
          renderBookingForm(thisDate);
        }
        count++;
      }
      var button = document.createElement('button');
      var thisDate = day.start_time.split('T')[0];
      button.addEventListener('click', function(){
        getBookings(day.start_time, day.end_time);
        if (logged_in === true) {
          renderBookingForm(thisDate);
        }
      })
      button.innerText = day.start_time.split('T')[0].split('-')[2];
      availableDates.appendChild(button);
    })
    if (!logged_in) {
      renderLogin();
    }
  })
});

/* TABBED INTERFACE MAGIC */

function tabify() {
  // Get relevant elements and collections
  var tabbed = document.querySelector('.tabbed');
  var tablist = tabbed.querySelector('ul');
  var tabs = tablist.querySelectorAll('a');
  var panels = tabbed.querySelectorAll('.tab-section');
  
  // The tab switching function
  const switchTab = function(oldTab, newTab) {
    newTab.focus();
    // Make the active tab focusable by the user (Tab key)
    newTab.removeAttribute('tabindex');
    // Set the selected state
    newTab.setAttribute('aria-selected', 'true');
    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');
    // Get the indices of the new and old tabs to find the correct
    // tab panels to show and hide
    let index = Array.prototype.indexOf.call(tabs, newTab);
    let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
    panels[oldIndex].hidden = true;
    panels[index].hidden = false;
  }
  
  // Add the tablist role to the first <ul> in the .tabbed container
  tablist.setAttribute('role', 'tablist');
  
  // Add semantics are remove user focusability for each tab
  Array.prototype.forEach.call(tabs, function(tab, i) {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', 'tab' + (i + 1));
    tab.setAttribute('tabindex', '-1');
    tab.parentNode.setAttribute('role', 'presentation');
    
    // Handle clicking of tabs for mouse users
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      let currentTab = tablist.querySelector('[aria-selected]');
      if (e.currentTarget !== currentTab) {
        switchTab(currentTab, e.currentTarget);
      }
    });
    
    // Handle keydown events for keyboard users
    tab.addEventListener('keydown', function(e) {
      // Get the index of the current tab in the tabs node list
      let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
      // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate
      let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
      if (dir !== null) {
        e.preventDefault();
        // If the down key is pressed, move focus to the open panel,
        // otherwise switch to the adjacent tab
        dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
      }
    });
  });
  
  // Add tab panel semantics and hide them all
  Array.prototype.forEach.call(panels, (panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '-1');
    let id = panel.getAttribute('id');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.hidden = true; 
  });
  
  // Initially activate the first tab and reveal the first tab panel
  tabs[0].removeAttribute('tabindex');
  tabs[0].setAttribute('aria-selected', 'true');
  panels[0].hidden = false;
};
