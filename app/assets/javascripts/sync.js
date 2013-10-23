var Sync = {
  init: function(){
    var party = $(location).attr('pathname')
    this.partyAddress = 'https://queued.firebaseIO.com/' + party + '/'
    this.firebaseServer = new Firebase(this.partyAddress)

    var self = this
    this.firebaseServer.on('value', function(snapshot){
      self.loadQueue(snapshot.val())
    })
  },
  addSongToQueue: function($elem){
    var songRef = new Firebase(this.partyAddress+$elem.data('songkey'))
    var newSong = songRef.set(this.compileDataForFirebase($elem))
  },
  compileDataForFirebase: function($data){
    return {
      songName: $data.find('.result-song').text(),
      artistName: $data.find('.result-artist').text(),
      albumName: $data.find('.result-album').text(),
      songDuration: $data.find('.result-duration').text(),
      songKey: $data.data('songkey'),
      voteCount: 0
    }
  },
  loadQueue: function(songList){
    console.log('loading queue'+songList)
    Queue.elem.empty()
    if(songList == null) return
    $.each(songList, function(i, song){
      Queue.addSongFromServer(song)
    })
  },
  storeUserVote: function(songkey){
    var songRef = new Firebase(this.partyAddress + songkey + '/votes/' + User.key)
    songRef.set(1)
  },
  checkIfUserVoted: function(songkey){
    var songRef = new Firebase(this.partyAddress + songkey + '/votes/')
    var returnValue
    songRef.child(User.key).once('value', function(snapshot){
      if(snapshot.val() == 1){
        returnValue = true
      }
      else{
        returnValue = false
      }
    })
    return returnValue
  }
}
