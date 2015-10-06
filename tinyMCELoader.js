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
    // 2. take canvas snap shot

    if (node.nodeValue !== null) {
      // create node in tinyMCE fashion
      var htmlContent = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}", {displayMode: false});
      var elem = document.createElement("div");
      elem.innerHTML = htmlContent;
      // convert elem to canvas
      html2canvas(elem, {
        onrendered: function(canvas) {
//          var canvasImg = canvas.toData
          console.log(canvas);
        }
      });
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
    var wordReplacer = function(node, regexResult) {
      var _innerText = node.nodeValue.replace(regexResult[1], "");
      return _innerText;
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

      textVal = wordReplacer(textNode, result);
      textNode.nodeValue = textVal;
      renderCB(textNode);
    }
  };

  var exec = function() {
    // Set up event listener
    editorBody.addEventListener('keydown', function(e) {
      if (document.activeElement === editorBody) {
        processor(window.getSelection().focusNode, render);
      }
    });
    // add event listener for mouse actions
//    editorBody.addEventListener('')
  };

})(this);
