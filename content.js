//document.body.style.background = "yellow";
// Polling in 1000 ms to check if the document is ready;
// TODO: match link script url with target url
// User webworker to monitor app state at background
// TODO: Match tab for different notes or press button
var dev = true;

(function naiveEngine() {
  'use strict';

var dev = true;

var Lexer = function() {
  var lexer = function(input) {
    var EOF = "EOF";
    var whitespaceRegex = /\s*/;
    var whitespaceContactRegex = / +|\\  +/;
    var rmWhitespaceRegex = /[^\s]+/g;          // /[^s]+/g global or not?
    // This regex matches any other TeX function, which is a backslash followed by a word or a single symbol
    var anyFunc = /\\(?:[a-zA-Z]+|.)/; 
    // var mathModeBling=/(\$([^\$]*)\$)/g;                // /g to avoid infinite loop
    var mathModeBling=/(\$([^\$]*)\$)/g;                // /g to avoid infinite loop
    var result;
    var tokens = [];
    while((result = mathModeBling.exec(input)) !== null) {
      if (result.index === mathModeBling.lastIndex) {
        mathModeBling.lastIndex++;
      }
      if (dev) { console.log(result[2]); }
      // now call the translate engine to translate that onto screen
      tokens.push(result[2]);
    }
    return tokens;
  };
  return lexer;
};


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
var Preprocessor = function(userDom) {
  var lexer = new Lexer();
  var traverseDirectChild = function(dom, lexer) {
    var tokens;
    var children = userDom.childNodes;
    for (var i = 0, len = children.length; i < len; i++) {
  //    console.log(children[i].innerHTML);
      tokens = lexer(children[i].innerHTML);
      // now processor tokens
    }
  };
  
  traverseDirectChild(userDom, lexer);
  /*
  return {
  
  };*/
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
      injectRenderEngine(dom);
      Preprocessor(dom);
//      getUserContentInHTML(dom);
//      injectRenderScript(dom);
    }
  }
};

var timeoutID = window.setTimeout(pollState, 8000);

})(window);

