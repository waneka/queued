$(document).on('page:load', function(){
  Search.init()
  User.init()
  Queue.init()
  Sync.init()
  bindAddSong()
  bindToggleSwitch()
  bindPlayerExpander()
})