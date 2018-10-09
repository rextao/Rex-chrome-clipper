(function () {
  var pageHelper = undefined;
  chrome.runtime.onMessage.addListener(
    function (request) {
      if (request.action === 'autoClipper' ){
        var autoClipper = new AutoClipper();
        autoClipper.init();
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