//document.body.style.background = "yellow";
// Polling in 1000 ms to check if the document is ready;
// TODO: match link script url with target url

var dev = true;
var pollState = function() {
  var element = document.getElementById("entinymce_328_ifr");
  if (element !== null) {
    element.addEventListener();
    clearInterval(intervalID);
    if(dev) { console.log(element); }
  }
};

var intervalID = window.setInterval(pollState, 1000);
