var dev = true;
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
  // file paths
  var tinyMCELoaderPath = "tinyMCELoader.js";
  var html2canvasPath = "js/html2canvas.js";

  // Polling in 100ms
  var checkExist = window.setInterval(function() {
    var nodeId = iframe;
    if ($id(nodeId) !== null) {
      // newDom
      nestedDom = $dom($id(nodeId));
      utility.injectScript(tinyMCELoaderPath, nestedDom);       // editor script
      utility.injectScript(html2canvasPath, nestedDom);         // html2canvas
      window.clearInterval(checkExist);
    }
  }, 100);

})(window);
