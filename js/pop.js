(function(){
  $('#btn').on('click',function () {
    chrome.tabs.query({active:true, currentWindow:true}, function (tab) {//获取当前tab
      //向tab发送请求
      chrome.tabs.sendMessage(tab[0].id, {
        action: "send"
      }, function (response) {
        console.log(response);
      });
    });
  })

})();