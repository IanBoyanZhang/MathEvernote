// New line events need to detect
// 1. newline "<br clear='none'>"
// 2. return/enter code 13
// 3. reach maximum width // or interpret them as same line? just paste the image?

// TODO: checkCurrentCursor // caret position
(function(exports) {
  'use strict';
  var editorId = "entinymce_328"; 
  var tinymce = window.parent.tinymce;
  var editor = window.parent.tinymce.get(editorId);
  var editorBody = editor.getBody();
  console.log(tinymce.get("entinymce_328"));

  var inputTextCache = "";
  var waitEditor = window.setTimeout(function() {
    exec();
    window.clearTimeout(waitEditor);
  }, 2000);

  var render = function(node) {
    // render the node with picture
    // 1. render html with katex
    // 2. take canvas snap shot
    // 3. remove katex rendered object

    if (node.nodeValue !== null) {
      // create node in tinyMCE fashion
      var htmlContent = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}", {displayMode: false});
      var elem = document.createElement("div");
      elem.innerHTML = htmlContent;
      console.log(editor.selection.setNode(elem));
    }
  };

  var processor = function(textNode, renderCB) {
    var mathModeBling=/(\$([^\$]*)\$)/g;
    var result;
    var textVal = textNode.nodeValue;

    /*
     * @input node internal html
     */
    var wordReplacer = function(nodeText, regexResult) {
//      var _innerText = node.nodeValue;
      nodeText = nodeText.replace(regexResult[1], "");
      return nodeText;
    };

    if (textVal === null) {
      return "<br clear='none'>";
    }
    
    if (typeof textVal !== 'string') {
      return null;
    }

    while((result = mathModeBling.exec(textVal)) !== null) {
      if (result.index === mathModeBling.lastIndex) {
        mathModeBling.lastIndex++;
      }

      textVal = wordReplacer(textVal, result);
      renderCB(textNode);
    }
  };

  var exec = function() {
//    console.log(editor.selection.getRng().endOffset);
//    console.log(editor.selection.getRng());
    // Set up event listener
    editorBody.addEventListener('keydown', function(e) {
      if (document.activeElement === editorBody) {
//        processor(editor.selection.getNode(), render);
        processor(window.getSelection().focusNode, render);
      }
    });
    // add event listener for mouse actions
//    editorBody.addEventListener('')
  };

})(this);
