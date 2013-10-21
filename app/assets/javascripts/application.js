// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var Sync = {
  init: function(party){
    this.partyAddress = 'https://queued.firebaseIO.com/' + party + '/'
    this.firebaseServer = new Firebase(this.partyAddress)

    var self = this
    this.firebaseServer.on('value', function(snapshot){
      self.loadQueue(snapshot)
      Queue.sortByVote()
    })
    this.firebaseServer.on('child_removed', function(snapshot){
      self.loadQueue(snapshot)
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
  loadQueue: function(data){
    console.log('loading queue')
    Queue.elem.empty()
    $.each(data.val(), function(i, song){
      Queue.addSongFromServer(song)
    })
  }
}

var Queue = {
  init: function(){
    this.elem = $(document).find('.queue-table')

    var self = this
    this.elem.on('click', '.upvote-submit', function(e){
      self.upVote($(e.target).closest('tr'))
    })
  },
  addSongFromServer: function(data){
    this.elem.append(this.buildQueueRow(data))
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
    Sync.firebaseServer.child(voteSong).child('voteCount').set(newVote)
  },
  sortByVote: function(){
    var rows = this.elem.find('tr')

    rows.sort(function(a,b){
      return (parseInt($(b).find('.queue-vote-count').text())) > (parseInt($(a).find('.queue-vote-count').text()))
    })

    var self = this
    $.each(rows, function(idx, itm){
      self.elem.append(itm)
    })

  },
  addSongFromSearch: function($row){
    this.elem.append($row.clone().find('.result-add').remove())
  },
  nextSong: function(){
    var nextSongKey = this.elem.find('tr').first().data('songkey')
    Sync.firebaseServer.child(nextSongKey).remove()
    return nextSongKey
  }
}

var Search = {
  init: function(){
    this.elem = $(document).find('.search-container')
    this.submit = this.elem.find('.search-submit')
    this.table = this.elem.find('.results-table')

    var self = this
    this.submit.click(function(){
      self.fetchSearchResults()
    })
    this.elem.on('click', '.add-to-queue-submit', function(e){
      Sync.addSongToQueue($(e.target).closest('tr'))
      self.respondToBeingAdded($(e.target))
    })
  },
  fetchSearchResults: function(){
    this.term = this.elem.find('.search-input-term').val()

    var self = this
    $.ajax({
      url: '/search',
      type: 'post',
      data: {song: this.term}
    })
    .done(function(response){
      self.displaySearchResults(JSON.parse(response))
    })
  },
  displaySearchResults: function(data){
    var self = this
    $.each(data.result.results, function(i, result){
      self.table.append(self.buildResultRow(result))
    })
  },
  respondToBeingAdded: function($elem){
    $elem.prop('disabled', true)
  },
  buildResultRow: function(data){
    var songDuration = this.secondsToHMS(data.duration)
    return row = $('<tr>', { class: 'result-row'} ).data('songkey', data.key)
    .append(
      $('<td>', { class: 'result-song'} ).text(data.name),
      $('<td>', { class: 'result-artist'} ).text(data.artist),
      $('<td>', { class: 'result-album'} ).text(data.album),
      $('<td>', { class: 'result-duration'} ).text(songDuration),
      $('<td>', { class: 'result-add'} )
      .append($('<button>', {class: 'add-to-queue-submit'} ).text('+'))
      )
  },
  secondsToHMS: function(sec){
    var sec = parseInt(sec)
    var h = Math.floor(sec/3600)
    sec -= h*3600
    var m = Math.floor(sec/60)
    sec -= m*60
    result = ((h > 0 ? h+":" : "") + (m < 10 && h > 0 ? '0'+m : m) + ":" + (sec < 10 ? '0'+sec : sec))
    return result
  }
}

$(document).ready(function(){
  Search.init()
  Queue.init()
  Sync.init('tyler')
})
