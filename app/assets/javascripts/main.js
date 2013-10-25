$(document).on('page:load', function(){
  Queue.init()
  Sync.init()
  Search.init()
  User.init()
})

$(document).ready(function(){
  bindAddSong()
  bindToggleSwitch()
  bindPlayerExpander()
})
