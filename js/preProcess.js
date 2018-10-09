/**
 * rt-clipper-hide-hook：为了标识已经隐藏的元素
 * @constructor
 */
var PreProcess = function () {

  function a() {
    var $rtClipperSave = $('.rt-clipper-save-hook');
    if($rtClipperSave.length === 0 ){
      tools.openMessage('无剪辑内容，无需处理');
      return;
    }
    $rtClipperSave.each(function () {
      var $siblings = $(this).siblings();
      $siblings.hide();
      $siblings.addClass('rt-clipper-hide-hook');
      hideSiblingsToBody($(this));
    })

  }

  /**
   * 隐藏当前元素的同辈元素，父级的同辈元素，再父级的同辈元素
   * 直到body
   */
  function hideSiblingsToBody($el) {
    if($el.parent()[0].tagName === 'BODY'){
      return;
    }
    var $siblings =$el.parent().siblings().not('.rt-clipper-save-hook');
    $siblings.hide();
    $siblings.addClass('rt-clipper-hide-hook');
    return hideSiblingsToBody($el.parent());
  }
  this.init = function () {
    tools.openMessage('begin','error');
    a();
  }
};