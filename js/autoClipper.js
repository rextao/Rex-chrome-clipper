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
  // https://blog.csdn.net/*
  hostMap['blog_csdn'] = function () {
    tools.openMessage('当前为csdn blog页面');
    var $main = $('main');
    var blogContentBox = $main.find('.blog-content-box');
    $main.width('100%');
    blogContentBox.addClass('rt-clipper-save-hook');
    // 删除无用的空白
    blogContentBox.nextAll().remove();
    $main.nextAll().remove();
    preProcess.init();
  };

  // 伯乐在线
  hostMap['jobbole'] = function () {
    tools.openMessage('当前为伯乐在线页面');
    var $wrapper = $('#wrapper');
    var $grid8 = $wrapper.find(".grid-8").eq(0);
    var $content = $grid8.children().eq(0);
    $content.addClass('rt-clipper-save-hook');
    $grid8.nextAll().remove();
    $content.nextAll().remove();
    $grid8.css({"position": "absolute","top": "40px","left": "5%","width": "90%"});
    var $singlePageInnerWidget = $('#single-page-inner-widget');
    $singlePageInnerWidget.next().remove();
    $singlePageInnerWidget.remove();
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
      return key.replace(/_/g,'.')
    }
  }
  function autoClipper() {
    var hostname = document.location.hostname;
    for(var key in hostMap){
      var convertKey = keyConvert(key);
      if(hostname.indexOf(convertKey) !== -1){
        hostMap[key]();
        return;
      }
    }
    tools.openMessage('似乎未剪辑成功','error');
  }
  this.init = function () {
    autoClipper();
  }
};