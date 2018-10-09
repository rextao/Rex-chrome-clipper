(function(){
  $('#popup').on('click',function (e) {
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
      });
    });
  });
})();