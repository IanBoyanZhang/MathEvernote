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
  var lexer = function(input, processor, currNode) {
    var rtnStr = input;
    processor = processor || function(val) { return val; };
    var EOF = "EOF";
    var whitespaceRegex = /\s*/;
    var whitespaceContactRegex = / +|\\  +/;
    var rmWhitespaceRegex = /[^\s]+/g;          // /[^s]+/g global or not?
    var anyFunc = /\\(?:[a-zA-Z]+|.)/; 
    // var mathModeBling=/(\$([^\$]*)\$)/g;                // /g to avoid infinite loop
    var mathModeBling=/(\$([^\$]*)\$)/g;                // /g to avoid infinite loop
    var result;
    while((result = mathModeBling.exec(input)) !== null) {
      if (result.index === mathModeBling.lastIndex) {
        mathModeBling.lastIndex++;
      }
      if (dev) { console.log(result[2]); }
      rtnStr = processor(rtnStr, result[1]);
    }
//    return currNode;
    return rtnStr;
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
  (userDom.body || userDom.documentElement).appendChild(renderExecScript);
};

// @input: DOM
var Preprocessor = function(userDom) {
  var lexer = new Lexer();
  var textProcessor = function(inputLine, targetStr) {
    // check targetStr;
    return inputLine.replace(targetStr, 'butt');
//    var rtnVal = katex.render("c = \\pm\\sqrt{a^2 + b^2}", currNode).firstChild;
//    console.log(rtnVal);
//    return rtnVal;
  };

  var traverseDirectChild = function(dom, lexer) {
    var newNodeValue;
    var children = userDom.body.childNodes;
    for (var i = 0, len = children.length; i < len; i++) {
      newNodeValue = lexer(children[i].innerHTML, textProcessor);
      // newNodeValue = lexer(children[i], textProcessor);
      children[i].firstChild.nodeValue = newNodeValue;
    }
  };
  
  traverseDirectChild(userDom, lexer);
  /*
  return {
  
  };*/
};

var getUserContentInHTML = function(dom) {
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

