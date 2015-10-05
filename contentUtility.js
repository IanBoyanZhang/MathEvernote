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
  };

  var injectStylesheet = function injectStylesheet(file, dom) {
    var _link = document.createElement('link');
    _link.rel = "stylesheet";
    _link.href= chrome.extention.getURL(file);
    dom.head.appendChild(_link);
  };

  exports.utility.extentionBaseURL = chrome.extension.getURL("");
  exports.utility.injectScript = injectScript;
  exports.utility.injectStylesheet = injectStylesheet;
})(this);
