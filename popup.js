(function() {
  var element = document.getElementById("results");
  katex.render("c = \\pm\\sqrt{a^2 + b^2}", element);

  var clickHandler = function(e) {
    chrome.runtime.sendMessage({directive: "popup-click"}, function(response) {
      this.close();
    });
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('click-me').addEventListener('click', clickHandler);
  });
})();

