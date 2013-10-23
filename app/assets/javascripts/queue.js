var Queue = {
  init: function(){
    this.elem = $(document).find('.queue-table')

    this.elem.on('click', '.upvote-submit', function(e){
      Queue.upVote($(e.target).closest('tr'))
    })
  },
  addSongFromServer: function(data){
    this.elem.append(this.buildQueueRow(data))
    this.sortByVote()
  },
  buildQueueRow: function(data){
    return row = $('<tr>', {class: 'queue-row'}).data('songkey', data.songKey)
    .append(
      $('<td>', {class: 'queue-vote-count'}).text(data.voteCount),
      $('<td>', {class: 'queue-song'}).text(data.songName),
      $('<td>', {class: 'queue-artist'}).text(data.artistName),
      $('<td>', {class: 'queue-album'}).text(data.albumName),
      $('<td>', {class: 'queue-duration'}).text(data.songDuration),
      $('<td>', {class: 'queue-upvote'}).append($('<button>', {class: 'upvote-submit'}).text('+1'))
      )
  },
  upVote: function($song){
    var newVote = (parseInt($song.find('.queue-vote-count').html()) + 1)
    var voteSong = $song.data('songkey')
    if(!Sync.checkIfUserVoted(voteSong)){
      Sync.firebaseServer.child(voteSong).child('voteCount').set(newVote)
      Sync.storeUserVote(voteSong)
    }
  },
  sortByVote: function(){
    var rows = this.elem.find('tr')

    rows.sort(function(a,b){
      return (parseInt($(b).find('.queue-vote-count').text())) > (parseInt($(a).find('.queue-vote-count').text())) ? 1 : -1
    })

    $.each(rows, function(idx, itm){
      Queue.elem.append(itm)
    })

  },
  addSongFromSearch: function($row){
    this.elem.append($row.clone().find('.result-add').remove())
    this.sortByVote()
  },
  nextSong: function(){
    var nextSongKey = this.elem.find('tr').first().data('songkey')
    Sync.firebaseServer.child(nextSongKey).remove()
    return nextSongKey
  }
}
