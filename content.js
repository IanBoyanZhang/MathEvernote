//document.body.style.background = "yellow";
// Polling in 1000 ms to check if the document is ready;
// TODO: match link script url with target url
// User webworker to monitor app state at background
(function() {
var dev = true;

// Parsing user input with input 
var parsingDom = function(userDom) {
  var newNode = document.createElement( 'div' );
  userDom.appendChild(newNode);
  // Get all div
  var children = userDom.childNodes;
  console.log(children.length); 
  for (var i = 0; i < children.length; i++) {
    console.log(children[i].innerHTML);
  }
};

var getUserContentInHTML = function(dom) {
  if (dom.body.innerHTML=== "") { return; }
  var userContent = dom.getElementById('tinymce');
  return userContent;
};

var pollState = function() {
  var element = document.getElementById("entinymce_328_ifr");
  if (element !== null) {
    element.addEventListener();
    clearInterval(intervalID);
    var dom = element.contentWindow.document;
    // if(dev) { console.log("Embedded dom", dom); }
    // if(dev) { consoloe.log(element); }
    var userContent = getUserContentInHTML(dom);

    // create new div content if userContent is null
    if (userContent === null) {
      // create new div
      console.log("Not Ready yet!");
    } else {
      parsingDom(userContent);
    }
  }
};

var intervalID = window.setInterval(pollState, 10000);

})(window);

