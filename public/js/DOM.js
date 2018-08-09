// show available dates on load
const availableDates = document.getElementById('available-dates');
// show an intro before use picks a date
const introText = document.getElementById('intro');
// grabs all avaliable dates buttons
const dateButtons = document.getElementsByTagName('button');
// hide form until usre has clicked a date
const inputForm = document.getElementsByTagName('form');

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

function getBookings(start, end) {
  url = '/get-bookings?start=' + start + '&end=' + end;
  request(url, function(err, data){
    if (err) return console.log(err);
    console.log(data);
  });
}

// pick up database data on load
//   [ { start_time: 2018-08-11T13:46:57.417Z,
//        end_time: 2018-08-11T14:47:55.129Z } ]
window.addEventListener("load", function load(e) {
  console.log('I have loaded')
  // grab data here
  request('/get-availability', function(err, data){
    if (err) return console.log('error retrieving data');
    removeChildren('available-dates');
    JSON.parse(data).forEach(function(day){
      var button = document.createElement('button');
      button.addEventListener('click', function(){
        getBookings(day.start_time, day.end_time);
      })
      button.innerText = day.start_time.split('T')[0].split('-')[2];
      availableDates.appendChild(button);
    })
  })
});
