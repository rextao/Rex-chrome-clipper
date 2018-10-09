(function(){
  $('#startClipBtn').on('click',function () {
    chrome.tabs.query({active:true, currentWindow:true}, function (tab) {//获取当前tab
      //向tab发送请求
      chrome.tabs.sendMessage(tab[0].id, {
        action: "startClip"
      }, function (response) {
      });
    });
  });
  $('#destoryClipBtn').on('click',function () {
    chrome.tabs.query({active:true, currentWindow:true}, function (tab) {//获取当前tab
      //向tab发送请求
      chrome.tabs.sendMessage(tab[0].id, {
        action: "destoryClip"
      }, function (response) {
      });
    });
  });


  $('#preProcessBtn').on('click',function () {
    chrome.tabs.query({active:true, currentWindow:true}, function (tab) {//获取当前tab
      //向tab发送请求
      chrome.tabs.sendMessage(tab[0].id, {
        action: "preProcess"
      }, function (response) {
      });
    });
  })
})();