/**
 * 自动剪辑功能实现
 * 1. hostMap存储处理自动剪辑的网站
 *    - 对需要保留的元素增加，rt-clipper-save-hook样式
 *    - 为了美观，利用remove删除无用信息
 *    - hostMap中用_表示.  keyConvert函数进行了转换
 * 2. 如需要网每个剪辑页面增加新内容，可以往addCommonContent函数中书写
 * @constructor
 */
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
    $('#csdn-toolbar').remove();
    blogContentBox.nextAll().remove();
    $main.nextAll().remove();
    preProcess.init();
  };
  // 伯乐在线http://blog.jobbole.com/*，http://web.jobbole.com/*
  hostMap['jobbole'] = function () {
    tools.openMessage('当前为伯乐在线页面');
    var $wrapper = $('#wrapper');
    var $grid8 = $wrapper.find(".grid-8").eq(0);
    var $content = $grid8.children().eq(0);
    var $copyRightArea = $('.copyright-area');
    // 版权说明删除
    $copyRightArea.remove();
    $content.addClass('rt-clipper-save-hook');
    $grid8.nextAll().remove();
    $content.nextAll().remove();
    $grid8.css({"position": "absolute","top": "40px","left": "5%","width": "90%"});
    var $singlePageInnerWidget = $('#single-page-inner-widget');
    $singlePageInnerWidget.next().remove();
    $singlePageInnerWidget.remove();
    preProcess.init();
  };
  // 简书https://www.jianshu.com/
  hostMap['jianshu'] = function () {
    tools.openMessage('当前为简书页面');
    $('body').css('padding-top','0!important');
    var $article = $('.article');
    var $post = $article.parent();
    var $noteBottom = $('.note-bottom');
    var $author = $('.author');
    $article.addClass('rt-clipper-save-hook');
    $author.remove();
    $('nav').remove();
    $noteBottom.remove();
    $article.nextAll().remove();
    $post.siblings().remove();
    preProcess.init();
  };
  // 掘金
  hostMap['juejin_im'] = function(){
    tools.openMessage('当前为掘金页面');
    var $article = $('article');
    var $articelparent = $article.parent();
    var $main = $('main');
    $article.addClass('rt-clipper-save-hook');
    $('.author-info-block').remove();
    $main.siblings().remove();
    $article.siblings().remove();
    $articelparent.siblings().remove();
    $articelparent.css({width: "90%", margin: "0 auto"});
    preProcess.init();
  };
  // 思否：https://segmentfault.com/*
  hostMap['segmentfault'] = function () {
    tools.openMessage('当前为思否页面');
    var $main = $('.main');
    var $h1 = $main.find('h1');
    var $article = $('.article');
    var $nav = $('.global-nav');
    var $footer = $('#footer');
    var $breadcrumb = $('.breadcrumb');
    $main.addClass('rt-clipper-save-hook');
    $main.siblings().remove();
    $h1.siblings().remove();
    $article.nextAll().remove();
    $nav.remove();
    $breadcrumb.remove();
    $footer.remove();
    $article.css('margin-top','0');
    $article.parent().css('width','100%');
    preProcess.init();
  };
  // cnblogs:https://www.cnblogs.com/
  hostMap['cnblogs'] = function (){
    tools.openMessage('当前为cnblogs页面');
    var $main = $('#mainContent');
    var $header = $('#header');
    $main.addClass('rt-clipper-save-hook');
    $main.siblings().remove();
    $main.css('margin','10px');
    $header.remove();
    $('#MySignature').remove();
    $('#blog_post_info_block').remove();
    $('#blog-comments-placeholder').remove();
    $('#comment_form').remove();
    $('.postDesc').remove();
    preProcess.init();
  };
  // w3cplus :https://www.w3cplus.com/*
  hostMap['w3cplus'] = function () {
    tools.openMessage('当前为w3cplus页面');
    var $main = $('.main-wrap');
    $main.addClass('rt-clipper-save-hook');
    $main.siblings().remove();
    $main.css({'width':'95%','margin':'0 auto'});
    $('.region-sidebar-second').remove();
    $('#footer-col,#node_footer,#node_bottom').remove();
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
  // 增加一些每个页面都需要的内容
  function addCommonContent() {
    // 将原始页面链接增加到页面中
    $('body').prepend(
      '<p class="rt-clipper-save-hook rt-clipper-pdf-href" >原始页面：' +
        '<a  href="'+document.location.href+'">'+document.location.href+'</a>' +
      '</p>'
    )
  }

  function autoClipper() {
    var hostname = document.location.hostname;
    for(var key in hostMap){
      var convertKey = keyConvert(key);
      if(hostname.indexOf(convertKey) !== -1){
        hostMap[key]();
        addCommonContent();
        return;
      }
    }
    tools.openMessage('似乎未剪辑成功','error');
  }
  this.init = function () {
    if($('.rt-clipper-pdf-href').length !== 0) {
      tools.openMessage('页面已剪辑过');
      return;
    }
    autoClipper();
  }
};