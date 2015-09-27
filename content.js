//document.body.style.background = "yellow";
// Polling in 1000 ms to check if the document is ready;
// TODO: match link script url with target url
// User webworker to monitor app state at background
var dev = true;

(function() {

// @input: embedded iframe dom
var injectRenderEngine = function(userDom) {
  var renderEngineTag = userDom.getElementById('katex');
  if (renderEngineTag === null) {
    var renderEngineDiv = userDom.createElement('div');
    renderEngineDiv.style.visiblity = "hidden";
    renderEngineDiv.id="katex";
    userDom.body.insertBefore(renderEngineDiv, userDom.body.firstChild);
    var renderEngineScript = userDom.createElement('script');
    renderEngineScript.type = "text/javascript";
    userDom.body.appendChild(renderEngineScript);
//    console.log(userDom.getElementById('katex'));
  }
//  console.log(userDom);
};

// Parsing user input with input 
var parsingDom = function(userDom) {
  var newNode = document.createElement( 'div' );
  userDom.appendChild(newNode);
  // Get all div
  var children = userDom.childNodes;
  console.log(children);
/*  for (var i = 0; i < children.length; i++) {
    // parse line by line
    console.log(children[i].innerHTML);
  }
*/  
  // create a new div then verify creation is successful

};

var getUserContentInHTML = function(dom) {
  // var userContentDom = getUserContentInHTML(dom);
  if (dom.body.innerHTML=== "") { return; }
  var embeddedDom = dom.getElementById('tinymce');
  console.log(embeddedDom);
  return embeddedDom;
};

var pollState = function() {
  var element = document.getElementById("entinymce_328_ifr");
  if (element !== null) {
    element.addEventListener();
    clearTimeout(timeoutID);
    var dom = element.contentWindow.document;
    // var userContentDom = getUserContentInHTML(dom);

    // create new div content if userContentDom is null
    if (dom === null) {
      // create new div
      console.log("Not Ready yet!");
    } else {
//      parsingDom(dom);
      injectRenderEngine(dom);
//      getUserContentInHTML(dom);
    }
  }
};

var timeoutID = window.setTimeout(pollState, 8000);

})(window);

