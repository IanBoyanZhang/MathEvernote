(function(exports) {
  'use strict';
  // console.log(window.parent.tinymce.PluginManager.load);
  var editorId = "entinymce_328"; 
  var tinymce = window.parent.tinymce;
  var editor = window.parent.tinymce.get(editorId);
  var editorBody = editor.getBody();
  // console.log(tinymce.get("entinymce_328").plugins);
  console.log(tinymce.get("entinymce_328"));

  var inputTextCache = "";
  var EmuCounter = 30;          // 3 seconds
  // plug-in contents
  var waitEditor = window.setTimeout(function() {
    // run exec
    exec();
    window.clearTimeout(waitEditor);
  }, 2000);

    var exec = function() {
  //  console.log(editor.selection.getRng().textContent);
    editor.execCommand('mceInsertContent', false, "my some text");
//    editor.execCommand('mceInsertRawHTML', false, "<br clear='none'>");       // create new line
    console.log(editor.selection.getRng().endOffset);
    console.log(editor.selection.getRng());
    // Set up event listener
    editorBody.addEventListener('keydown', function(e) {
      if (document.activeElement === editorBody) {
        console.log(e.keyCode);
      }
    });
  };

  // implement your event loop while true
  
})(this);
