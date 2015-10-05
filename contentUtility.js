// inject scripts
(function contentUtility(exports) {
  'use strict';

  var utility = {};
  exports.utility = utility;
  var injectScript = function injectScript(file, dom) {
    var _script = document.createElement('script');
    _script.setAttribute('type', 'text/javascript');
    _script.setAttribute('src', chrome.extension.getURL(file));
    dom.head.appendChild(_script);
//    console.log(utility.extentionBaseURL);
  };

  var execFunc = function execFunc(dom) {
  };
  exports.utility.extentionBaseURL = chrome.extension.getURL("");
  exports.utility.execFunc = execFunc;
  exports.utility.injectScript = injectScript;
})(this);
