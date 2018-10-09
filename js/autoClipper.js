var AutoClipper =function () {
  var hostMap = {};
  var preProcess = new PreProcess();
  // 知乎专栏：http://zhuanlan.*.com/;
  hostMap['zhuanlan'] = function () {
    tools.openMessage('当前为知乎页面');
    var $article = $('article');
    var $header = $article.find('header');
    var $headerNext = $header.next();
    if($article.length === 0 || $header.length === 0  || $headerNext.length === 0){
      tools.openMessage('未成功剪辑知乎页面！！','error');
      return;
    }
    $header.find('h1').addClass('rt-clipper-save-hook');
    $headerNext.addClass('rt-clipper-save-hook');
    $headerNext.nextAll().remove();
    preProcess.init();
  };

  /**
   * 将类似 zhihu_com 转换为 zhihu.com
   * zhihu.com这样的字符串无法作为关键字
   * @param key
   */
  function keyConvert(key) {
    // 如不存在_不转换
    if(key.indexOf('_') === -1){
      return key;
    }else {
      key.replace(/_/g,'.')
    }
  }
  function autoClipper() {
    var hostname = document.location.hostname;
    for(var key in hostMap){
      key = keyConvert(key);
      if(hostname.indexOf(key) !== -1){
        hostMap[key]();
        return;
      }
    }
  }
  this.init = function () {
    autoClipper()
  }
};