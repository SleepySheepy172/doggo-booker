// show available dates on load
const availableDates = document.getElementById('available-dates');
// show an intro before use picks a date
const introText = document.getElementById('intro');
// grabs all avaliable dates buttons
const dateButtons = document.getElementsByTagName('button');
// hide form until usre has clicked a date
const inputForm = document.getElementsByTagName('form');

// pick up database data on load
//   [ { start_time: 2018-08-11T13:46:57.417Z,
//        end_time: 2018-08-11T14:47:55.129Z } ]
window.addEventListener("load", function load(e) {
  console.log('I have loaded')
  // grab data here
  function request(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(null, xhr.responseText);
      } else {
        cb("error" + xhr.responseType);
      }
    }
    xhr.open("GET", url, true);
    xhr.send();
  }
});
