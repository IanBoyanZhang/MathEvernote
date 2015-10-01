//document.body.style.background = "yellow";
// Polling in 1000 ms to check if the document is ready;
// TODO: match link script url with target url
// User webworker to monitor app state at background
// TODO: Match tab for different notes or press button
var dev = true;

(function naiveEngine() {
  'use strict';

// @input: embedded iframe dom
var injectRenderEngine = function(userDom) {
  var renderEngineTag = userDom.getElementById('katex');
  if (renderEngineTag === null) {
    // inject render engine style
    var renderEngineStyle = userDom.createElement('link');
    renderEngineStyle.rel = "stylesheet";
    // renderEngineStyle.href = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.3.0/katex.min.css";
    renderEngineStyle.href = chrome.extension.getURL("resource/katex.min.css");
    userDom.head.appendChild(renderEngineStyle);
    // inject render engine script
    var renderEngineScript = userDom.createElement('script');
    renderEngineScript.type = "text/javascript";
    // renderEngineScript.src = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.3.0/katex.min.js";
    renderEngineScript.src = chrome.extension.getURL("resource/katex.min.js");
    userDom.head.appendChild(renderEngineScript);
  }
  // create a newTextNode
  var newNode = userDom.createElement('div');
  var textNode = userDom.createTextNode("Hello World");
  newNode.id = "results";
  newNode.appendChild(textNode);
  userDom.body.appendChild(newNode);
  if (dev) { console.log(userDom); }
};

var injectRenderScript = function(userDom) {
  var renderExecScript = userDom.createElement("script");
  renderExecScript.type = "text/javascript";
  renderExecScript.src = chrome.extension.getURL("execution.js");
/*  renderExecScript.onload = function() {
    this.parentNode.removeChild(this);
  };*/
  //(userDom.head || userDom.documentElement).appendChild(renderExecScript);
  (userDom.body || userDom.documentElement).appendChild(renderExecScript);
};

// @input: DOM
var Preprocessor = function(dom) {

  var parse = function(htmlElement) {
    
  };

  var traverseDirectChild = function(dom, parse) {
    children = userDom.childNodes;
    for (var i = 0, len = children.length; i < len; i++) {
      children[i] = parse(children[i].innerHTML);
    }
  };

  return {
  
  };
};

// Parsing user input with input 
// Iterate through 
var parsingDom = function(userDom) {
  // var newNode = document.createElement( 'div' );
  // userDom.appendChild(newNode);
  var children = userDom.childNodes;
  console.log(children);
  // traverse 
  for (var i = 0; i < children.length; i++) {
    // parse line by line
    console.log(children[i].innerHTML);
  }

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
//      injectRenderScript(dom);
    }
  }
};

var timeoutID = window.setTimeout(pollState, 8000);

})(window);

