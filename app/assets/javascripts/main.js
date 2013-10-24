$(document).on('page:load', function(){
  Queue.init()
  Sync.init()
  bindAddSong()
  bindToggleSwitch()
  bindPlayerExpander()
})

$(document).ready(function(){
  Sync.init()
  Queue.init()
  Search.init()
  User.init()
  bindAddSong()
  bindToggleSwitch()
  bindPlayerExpander()
})
