var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}

$(document).on('page:load', function(){
  if(User.ready){
    Player.init()
    Queue.init()
    Sync.init()
    Search.init()
    User.init()
    initRdio()
  }
})

$(document).ready(function(){
  Player.init()
  Queue.init()
  Sync.init()
  Search.init()
  User.init()
  bindAddSong()
  bindToggleSwitch()
  bindPlayerExpander()
  initRdio()
})
