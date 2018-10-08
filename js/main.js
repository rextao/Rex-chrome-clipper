(function () {
  console.log('巴扎黑测试');
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      // 全局增加样式
      globalConfig();
      if (request.action == 'send') {
        var $document = $(document);
        $('body').append('<div class="rt-clipper-border rt_top_hook"></div>');
        $('body').append('<div class="rt-clipper-border rt_right_hook"></div>');
        $('body').append('<div class="rt-clipper-border rt_bottom_hook"></div>');
        $('body').append('<div class="rt-clipper-border rt_left_hook"></div>');
        $document.on('mouseover',mouseOverHandler);
        $document.on('mouseout',mouseOutHandler);
        // addborder($('body'));
        sendResponse({state: '关键词填写成功！'});
      }

    }
  );

  /**
   * 如果直接在原有元素上增加border，或设置postion：relative
   * 可能会导致页面混乱，故构建一个div
   * 但构建的div会影响选择内部元素，故构建一个上下左右的border
   * @param e
   */
  function mouseOverHandler(e) {
    var _rect = e.target.getBoundingClientRect();
    var options = {
      'top': _rect.top,
      'left': _rect.left,
      'height': _rect.height,
      'width': _rect.width
    };
    $('.rt-clipper-box').css(options);
  }
  function mouseOutHandler(e) {
  }
  function globalConfig() {
    var $body = $('body');
    var $script = $('script');
    var $iframe = $('iframe');
    var $svg = $('svg');
    $svg.remove();
    $script.remove();
    $iframe.remove();
    $body.addClass('rextao');
    $body.on('click',function (e) {
      var $target = $(e.target);
      if($target.hasClass('rt_hideelem')){
        $(e.target).parents('.rt_border').hide();
      }
      if($target.hasClass('rt_selectelem')){
        clickSelectelem(e);
      }
      if($target.hasClass('rt_addelem')){
        var $this = $(e.target);
        $this.toggleClass('on');
        var $box = $this.parents('.rt_border');
        $box.toggleClass('rt_border_add');

      }
      // $('.rt_btbox').remove();
      // $this.parents('div').append('<div class="rt_btbox"><span class="rt_close">x</span><span class="rt_selectelem">√</span></div>');
      //
      // console.log('globalConfig')
    });

  }

  function clickSelectelem(e) {
    var $this = $(e.target);
    var $siblings = $this.parents('.rt_border').siblings().not('.rt_border_add');
    $siblings.removeClass('.rt_border');
    $siblings.hide();

    // 递归
    var $rtBorder = $('.rt_border');
    $rtBorder.removeClass('rt_border');
    addborder($rtBorder)
  }
  function addborder(selector) {
    var html = '<div class="rt_btbox">' +
                  '<span class="rt_hideelem">x</span>' +
                  '<span class="rt_selectelem">√</span>' +
                  '<span class="rt_addelem ">+</span>' +
               '</div>';
    var $selectEle =  selector.children(':not(link,script,svg,iframe)');
    $selectEle.each(function () {
      var $postion = $(this).css('position');
      if($postion !== 'absolute' || $postion !== 'fixed'){
        $(this).addClass('rt_position');
      }
    });
    $selectEle.addClass('rt_border');
    $selectEle.append(html);
  }

})();