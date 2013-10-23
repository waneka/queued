var Queue = {
  init: function(){
    this.elem = $(document).find('.queue-list')

    this.elem.on('click', '.upvote-submit', function(e){
      Queue.upVote($(e.target).closest('li'))
    })
  },
  addSongFromServer: function(data){
    this.elem.append(this.buildQueueRow(data))
    this.sortByVote()
  },
  buildQueueRow: function(data){
    var icon = "<i class='icon-thumbs-up upvote-submit'></i>"
    //TODO: add class to icon if somebody has already voted
    return $('<li>', {class: 'queue-item'}).data('songkey', data.songKey)
    .append(
      $('<span>', {class: 'queue-vote-count'}).text(data.voteCount),
      $('<img>', {src: data.albumURL, class: 'front-page-art queue-album-art'}),
      $('<span>', {class: 'queue-song'}).text(data.songName),
      $('<span>', {class: 'queue-artist'}).text(data.artistName),
      $('<span>', {class: 'queue-upvote'}).html(icon),
      $('<hr>', {class: 'queue-border'})
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
    var rows = this.elem.find('li')

    rows.sort(function(a,b){
      return (parseInt($(b).find('.queue-vote-count').text())) > (parseInt($(a).find('.queue-vote-count').text())) ? 1 : -1
    })

    $.each(rows, function(idx, itm){
      Queue.elem.append(itm)
    })
    // TopQueue.update()
  },
  addSongFromSearch: function($row){
    this.elem.append($row.clone().find('.result-add').remove())
    this.sortByVote()
  },
  nextSong: function(){
    var nextSongKey = this.elem.find('li').first().data('songkey')
    Sync.firebaseServer.child(nextSongKey).remove()
    return nextSongKey
  }
}

// var TopQueue = {
//   init: function(){
//     this.elem = $(document).find('.top-list')
//   },
//   update: function(){
//     var songs = Queue.elem.find('li')
//     $.each(songs, function(idx, itm){
//       if(idx <= 5){
//         TopQueue.elem.clone().append(itm)
//       }
//     })
//   }
// }