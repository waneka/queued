var Sync = {
  init: function(){
    var party = $(location).attr('pathname')
    this.partyAddress = 'https://queued.firebaseIO.com/' + party + '/'
    this.firebaseServer = new Firebase(this.partyAddress)

    this.firebaseServer.on('value', function(snapshot){
      Sync.loadQueue(snapshot.val())
    })
  },
  addSongToQueue: function($elem){
    var songRef = new Firebase(this.partyAddress+$elem.data('songkey'))
    songRef.set(this.compileDataForFirebase($elem))
  },
  compileDataForFirebase: function($data){
    return {
      songName: $data.find('.result-song').text(),
      artistName: $data.find('.result-artist').text(),
      albumName: $data.find('.result-album').text(),
      songKey: $data.data('songkey'),
      voteCount: 0
    }
  },
  loadQueue: function(songList){
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
