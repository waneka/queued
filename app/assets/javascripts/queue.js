var Queue = {
  init: function(){
    this.list = $(document).find('.queue-list')
    this.topList = $(document).find('.queue-top-list')

    $(document).on('click', '.upvote-submit', Queue.upVote)
  },
  addSongFromServer: function(data){
    this.list.append(this.buildQueueRow(data))
  },
  //TODO: get this html code out of the js
  buildVoteIcon: function(data){
    var classToAdd = ' selected'
    if(data.votes == null) return "<i class='icon-thumbs-up upvote-submit'></i>"
    if(data.votes[User.key] == 1) return "<i class='icon-thumbs-up upvote-submit"+classToAdd+"'></i>"
    return "<i class='icon-thumbs-up upvote-submit'></i>"
  },
  buildQueueRow: function(data){
    var icon = this.buildVoteIcon(data)
    return $('<li>', {class: 'queue-item'}).data('songkey', data.songKey)
    .append(
      $('<span>', {class: 'queue-vote-count'}).text(data.voteCount),
      $('<img>', {src: data.albumURL, class: 'front-page-art queue-album-art'}),
      $('<div>', {class: 'queue-span-wrapper queue-song'}).text(data.songName),
      $('<div>', {class: 'queue-span-wrapper queue-artist'}).text(data.artistName),
      $('<div>', {class: 'queue-span-wrapper icon queue-upvote'}).html(icon),
      $('<hr>', {class: 'queue-border'})
    )
  },
  upVote: function(e){
    var songItem = $(e.target).closest('li')
    console.log('songitem:'+songItem)
    var songID = songItem.data('songkey')
    console.log('songID:'+songID)
    if (Sync.checkIfUserVoted(songID) && songItem.data('songkey') != null) {
      Sync.storeUserVote(songID)
      var newVoteCount = (parseInt(songItem.find('.queue-vote-count').html()) + 1)
      Sync.firebaseServer.child(songID).child('voteCount').set(newVoteCount)
    }
  },
  sortByVote: function(){
    var rows = this.list.find('li')
    rows.sort(function(a,b){
      return (parseInt($(b).find('.queue-vote-count').text())) > (parseInt($(a).find('.queue-vote-count').text())) ? 1 : -1
    })
    $.each(rows, function(idx, itm){ Queue.list.append(itm) })
  },
  addSongFromSearch: function($row){
    this.list.append($row.clone().find('.result-add').remove())
  },
  nextSong: function(){
    var nextSongKey = this.list.find('li').first().data('songkey')
    Sync.firebaseServer.child(nextSongKey).remove()
    return nextSongKey
  },
  updateTopList: function(){
    var topListLimit = 5
    this.topList.empty()
    $.each(Queue.list.find('li'), function(idx, itm){
      if(idx < topListLimit) {
        Queue.topList.append(Queue.modifyForTopList(itm))
      }
    })
  },
  modifyForTopList: function(songItem){
    var songItemReformat = $(songItem).clone()
    songItemReformat.find('.queue-upvote').remove()
    songItemReformat.find('hr').removeClass('queue-border')
    return songItemReformat
  }
}
