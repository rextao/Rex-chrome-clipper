/**
 * rt-clipper-hide-hook：为了标识已经隐藏的元素
 * @constructor
 */
var PreProcess = function () {

  function processClipper() {
    var $rtClipperSave = $('.rt-clipper-save-hook');
    if($rtClipperSave.length === 0 ){
      tools.openMessage('无剪辑内容，无需处理','error');
      return;
    }
    $rtClipperSave.each(function () {
      addClipperShowToBody($(this));
    });
  }

  /**
   * 递归到body元素
   * 为当前元素增加rt-clipper-show-hook，siblings增加rt-clipper-hide-hook
   * 然后利用样式! important
   * @param $el
   */
  function addClipperShowToBody($el) {
    if($el[0].tagName === 'BODY'){
      return;
    }
    $el.addClass('rt-clipper-show-hook');
    // siblings元素要删除,鼠标移动生成rect的rt-clipper-border，与message相关的rt-message
    $el.siblings().not('.rt-clipper-border').not('.rt-message').addClass('rt-clipper-hide-hook');
    return addClipperShowToBody($el.parent())
  }
  this.init = function () {
    processClipper();
  }
};