(function(){
  $('#popup').on('click',function (e) {
    // 显示不了三个汉字
    chrome.browserAction.setBadgeText({text: '汪...'});
    var id = e.target.id;
    // 如点击的不是button
    if(!id || id ==='popup'){
      return;
    }
    chrome.tabs.query({active:true, currentWindow:true}, function (tab) {//获取当前tab
      //向tab发送请求
      chrome.tabs.sendMessage(tab[0].id, {
        action: id
      }, function (response) {
        // 有返回时，3秒后将badge设置为空
        setTimeout(function () {
          chrome.browserAction.setBadgeText({text: ''});
        },3000)
      });
    });
  });
})();