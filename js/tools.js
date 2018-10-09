(function (w) {
  if (!!w.tools) {
    return;
  }
  var tools = {};
  /**
   * 消息提醒，但似乎有问题-。-
   * 不能单独删除
   * @param msg
   * @param type
   */
  tools.openMessage = function (msg, type) {
    if (!msg) {
      return;
    }
    var id = 'rtMsg'+ Math.ceil((Math.random() * 1000000));
    var html = '<div id="'+id+'" class="rt-message ' + (type || 'success') + '" >' + msg + '</div>';
    $('body').append(html);
    setTimeout(function () {
      $('#'+id).remove();
    }, 3000);
  };

  w.tools = tools;
})(window);
