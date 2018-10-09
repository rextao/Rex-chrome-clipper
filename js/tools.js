(function (w) {
  if (!!w.tools) {
    return;
  }
  var tools = {};
  tools.openMessage = function (msg, type) {
    if (!msg) {
      return;
    }
    var html = '<div class="rt-message ' + (type || 'success') + '" >' + msg + '</div>';
    $('body').append(html);
    setTimeout(function () {
      $('.rt-message').remove();
    }, 3000);
  };

  w.tools = tools;
})(window);
