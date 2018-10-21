(function () {
  $(document).on('keypress',function (e) {
    if (e.shiftKey && e.keyCode === 67) {
      tools.openMessage('启动页面可编辑');
      document.body.contentEditable = true;
    }
    if (e.shiftKey && e.keyCode === 86) {
      tools.openMessage('禁用页面可编辑','error');
      document.body.contentEditable = false;
    }
  });

  var pageHelper = undefined;
  chrome.runtime.onMessage.addListener(
    function (request) {
      if (request.action === 'autoClipper' ){
        var autoClipper = new AutoClipper();
        autoClipper.init();
      }
      if (request.action === 'startContentEdit' ){
        tools.openMessage('启动页面可编辑');
        document.body.contentEditable = true;
      }
      if (request.action === 'destoryContentEdit' ){
        tools.openMessage('禁用页面可编辑','error');
        document.body.contentEditable = false;
      }
      if (request.action === 'startClip' ) {
        if(!pageHelper){
          tools.openMessage('巴扎黑Clipper启动');
          pageHelper = new PageHelper();
          pageHelper.init();
        }else {
          tools.openMessage('已经启动了！','error');
        }
      }
      if (request.action === 'destoryClip') {
          tools.openMessage('巴扎黑Clipper禁用','error');
          pageHelper.destroy();
      }
      if (request.action === 'preProcess') {
        var preProcess = new PreProcess();
        preProcess.init();

      }
    }
  );
})();