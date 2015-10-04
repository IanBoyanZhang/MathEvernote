var dev = true;
// execFunc is in global context
(function naiveEngine(exports) {
  'use strict';

  var dev = true;
  var iframe = "entinymce_328_ifr";
  var $id = function(d) {
    return document.getElementById(d);
  };
  var $dom = function(fr) {
    return fr.contentWindow.document;
  };
  var nestedDom = null;
  var tinyMCELoaderPath = "tinyMCELoader.js";

  // Polling in 100ms
  var checkExist = window.setInterval(function() {
    var nodeId = iframe;
    if ($id(nodeId) !== null) {
      console.log("node exists!");
      // newDom
      nestedDom = $dom($id(nodeId));
      console.log($dom($id(nodeId)).body);
      utility.injectScript(tinyMCELoaderPath, nestedDom);
      window.clearInterval(checkExist);
    }
  }, 100);

})(window);
