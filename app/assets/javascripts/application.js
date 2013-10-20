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

var queueDataRef = new Firebase('https://queued.firebaseIO.com')

queueDataRef.on('value', function(snapshot){
  Sync.loadQueue(snapshot)
})

queueDataRef.on('child_removed', function(snapshot){
  Sync.loadQueue(snapshot)
})

var Sync = {
  addSongToQueue: function($elem){
    var newSong = queueDataRef.push(this.compileDataForFirebase($elem))
  },
  compileDataForFirebase: function($data){
    return {
      songName: $data.find('.result-song').text(),
      artistName: $data.find('.result-artist').text(),
      albumName: $data.find('.result-album').text(),
      songDuration: $data.find('.result-duration').text(),
      songKey: $data.data('songkey')
    }
  },
  loadQueue: function(data){
    Queue.elem.empty()
    $.each(data.val(), function(i, song){
      Queue.addSongFromServer(song)
    })
  }
}

var Queue = {
  init: function(){
    this.elem = $(document).find('.queue-table')
  },
  addSongFromServer: function(data){
    this.elem.append(this.buildQueueRow(data))
  },
  buildQueueRow: function(data){
    return row = $('<tr>', {class: 'queue-row'}).data('songkey', data.songKey)
    .append(
      $('<td>', {class: 'queue-song'}).text(data.songName),
      $('<td>', {class: 'queue-artist'}).text(data.artistName),
      $('<td>', {class: 'queue-album'}).text(data.albumName),
      $('<td>', {class: 'queue-duration'}).text(data.songDuration)
      )
  },
  addSongFromSearch: function($row){
    this.elem.append($row.clone().find('.result-add').remove())
  },
  nextSong: function(){
    queueDataRef.startAt().limit(1).once('value', function(snapshot){
      mememe = snapshot.val()
      $.each(mememe, function(key){
        fuckyouverymuch = key
      })
    })
    var thefword = this.elem.find('tr').first().data('songkey')
    queueDataRef.child(fuckyouverymuch).remove()
    return thefword
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
      url: 'search',
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
    return row = $('<tr>', { class: 'result-row'} ).data('songkey', data.key)
    .append(
      $('<td>', { class: 'result-song'} ).text(data.name),
      $('<td>', { class: 'result-artist'} ).text(data.artist),
      $('<td>', { class: 'result-album'} ).text(data.album),
      $('<td>', { class: 'result-duration'} ).text(data.duration),
      $('<td>', { class: 'result-add'} )
      .append($('<button>', {class: 'add-to-queue-submit'} ).text('+'))
      )
  }

  // secondsToHMS: function(sec){
  //   var h = Math.floor(sec/3600)
  //   sec -= h*3600
  //   var m = Math.floor(sec/60)
  //   sec -= m*60
  //   return ((h+":" if h > 0) + (m < 10 && h > 0 ? '0'+m : m) + ":" + (sec < 10 ? '0'+sec : sec))
  // }
}

$(document).ready(function(){
  Search.init()
  Queue.init()
})
