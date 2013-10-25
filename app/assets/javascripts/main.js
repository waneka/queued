$(document).on('page:load', function(){
  Queue.init()
  Sync.init()
  Search.init()
  User.init()
})

$(document).ready(function(){
  Queue.init()
  Sync.init()
  Search.init()
  User.init()
  bindAddSong()
  bindToggleSwitch()
  bindPlayerExpander()
})
