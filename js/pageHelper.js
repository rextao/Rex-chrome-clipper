/**
 * 此js主要用于处理鼠标与键盘的操作
 *  -hook样式，只用于js操作，无css样式
 *  说明：
 *    1、鼠标移动时，会在元素周围生成由（rt_top_hook，rt_right_hook，rt_bottom_hook等）
 *       组成的蓝框
 *    2、点击鼠标时，为当前元素增加rt-clipper-save-hook，并生成当前元素上灰层（rt-clipper-save）
 *       rt-clipper-save会绑定当前元素data('_node')，灰层append到body上
 *    3、灰层rt-clipper-save包含rt-close-hook关闭按钮，删除灰层，根据绑定的_node删除元素上的
 *      rt-clipper-save-hook
 * @constructor
 */
var PageHelper = function () {
  var $document = $(document);
  var $body = $('body');
  var _border ={
    "height" : undefined,
    "width" : undefined,
    "left" : undefined,
    "top" : undefined,
    "node": undefined,
    "borderwidth" : 3//线条宽
  };

  /**
   * 判断是否为rt-clipper-save
   * @param e
   * @return {boolean} true表示是，否则
   */
  function isRtClipperSave(e) {
    return !!($(e.target).hasClass('rt-clipper-save') || $(e.target).parent().hasClass('rt-clipper-save'));
  }
  var mouseOverHandler = function (e) {
    var $target = $(e.target);
    // 如是遮罩层rt-clipper-save，则不再生成边界
    if(isRtClipperSave(e)){
      return false;
    }
    var _offset = $target.offset();
    _border.height = $target.outerHeight();
    _border.width = $target.outerWidth();
    _border.left = _offset.left;
    _border.top = _offset.top;
    $('.rt_top_hook').css({
      'top': _border.top,
      'left': _border.left ,
      'height': _border.borderwidth,
      'width': _border.width
    });
    $('.rt_right_hook').css({
      'top': _border.top,
      'left': _border.left  + _border.width,
      'height': _border.height,
      'width': _border.borderwidth
    });
    $('.rt_bottom_hook').css({
      'top': _border.top + _border.height,
      'left': _border.left ,
      'height': _border.borderwidth,
      'width': _border.width
    });
    $('.rt_left_hook').css({
      'top': _border.top,
      'left': _border.left ,
      'height': _border.height,
      'width': _border.borderwidth
    });
    _border.node = e.target;
  };
  var clickHandler = function(e) {
    e.preventDefault();
    e.stopPropagation();
    var $target = $(e.target);
    // 点击灰层的关闭按钮
    // 默认rt-close-hook父级是rt-clipper-save
    if($target.hasClass('rt-close-hook')){
      var $rtClipperSave = $target.parent();
      var _node = $rtClipperSave.data('_node');
      $(_node).removeClass('rt-clipper-save-hook');
      $rtClipperSave.remove();
      return false;
    }
    // 如已经点击过不再生成元素，保证不再同一个元素生成2个遮罩
    if(isRtClipperSave(e)){
      return false;
    }
    $target.addClass('rt-clipper-save-hook');
    createSaveBox();
  };
  /**
   * 点击某个元素后，在当前元素上覆盖灰层
   */
  function createSaveBox() {
    var $div = $(document.createElement('div'));
    $div.css(_border);
    $div.data('_node',_border.node);
    $div.addClass('rt-clipper-save');
    $div.append('<span class="rt-close-hook">x</span>');
    $body.append($div);
  }

  /**
   * body上append，一个上右下左的4个div，用于构建rect
   * 随着鼠标move，方块移动
   */
  var appendMoveBorder = function() {
    var html = '<div class="rt-clipper-border rt_top_hook"></div>' +
               '<div class="rt-clipper-border rt_right_hook"></div>' +
               '<div class="rt-clipper-border rt_bottom_hook"></div>' +
               '<div class="rt-clipper-border rt_left_hook"></div>';
    $body.append(html);
  };

  this.init = function () {
    // 一个上右下左的4个div，用于构建rect
    appendMoveBorder();
    $document.on('mouseover',mouseOverHandler);
    $document.on('click',clickHandler);
  };

  this.destroy = function () {
    $document.off('mouseover',mouseOverHandler);
    $document.off('click',clickHandler);
  }





};