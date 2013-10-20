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

// var Sync = function(firebaseRef){
//   this.queueDataRef = new Firebase(firebaseRef)

//   this.queueDataRef.on('child_added', function(snapshot){
//     $('.queue-table').empty()
//     SyncData.loadqueue()
//   })
// }

// var SyncData = {

//   handleSongAdded: function($elem){
//     $('.queue-table').empty()
//     queueDataRef.push(this.compileDataForFirebase($elem))
//   },

//   compileDataForFirebase: function($data){
//     return {
//       songName: $data.find('.result-song').text(),
//       artistName: $data.find('.result-artist').text(),
//       albumName: $data.find('.result-album').text(),
//       songDuration: $data.find('.result-duration').text(),
//       songKey: $data.data('songkey')
//     }
//   },

//   loadQueue: function(){
//     queueDataRef.on('value', function(snapshot){
//       $.each(snapshot.val(), function(i, queueItem){
//         console.log(queueItem)
//         $('.queue-table').append(ViewController.buildQueueRow(queueItem))
//       })
//     })
//   }
// }

// var Queue = {
//   init: function(){
//     this.elem = $('.queue-table')
//   },
//   addSong: function(data){
//     this.elem.append(this.buildQueueRow(data))
//   },
//   buildQueueRow: function(data){
//     return row = $('<tr>', {class: 'queue-row'}).data('songkey', data.songKey)
//     .append(
//       $('<td>', {class: 'queue-song'}).text(data.songName),
//       $('<td>', {class: 'queue-artist'}).text(data.artistName),
//       $('<td>', {class: 'queue-album'}).text(data.albumName),
//       $('<td>', {class: 'queue-duration'}).text(data.songDuration)
//     )
//   }
// }

var Search = {
  init: function(){
    this.elem = $(document).find('.search-container')
    this.term = this.elem.find('.search-input-term').val()
    this.submit = this.elem.find('.search-submit')
    this.table = this.elem.find('.results-table')

    var self = this
    // Search submit
    this.submit.click(function(){
      self.fetchSearchResults()
    })
    // $(document).on('click', '.add-to-queue-submit', function(e){
    //   self.addCloneToQueue($(e.target).closest('tr'))
    //   self.respondToBeingAdded($(e.target))
    // })
  },
  fetchSearchResults: function(){
    var self = this
    $.ajax({
      url: 'search',
      type: 'post',
      data: {song:this.term}
    })
    .done(function(response){
      self.displaySearchResults(JSON.parse(response))
    })
  },
  displaySearchResults: function(data){
    var self = this
    console.log(data.result)
    $.each(data.result.results, function(i, result){
      this.table.append(self.buildResultRow(result))
    })
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
}


// var ViewController = {

//   init: function() {
//     // this.elem = $('.container') ---> in place of $(document)
//     SyncData.loadQueue()
//   },
//   addCloneToQueue: function($elem){
//     // var $row = $elem.clone()
//     // $row.find('.result-add').remove()
//     // $row.data($elem.data())
//     // $(document).find('.queue-table').append($row)
//     // SyncData.handleSongAdded($row)
//     SyncData.handleSongAdded($elem)
//   },
//   respondToBeingAdded: function($elem){
//     $elem.prop('disabled', true)
//   }
// }

$(document).ready(function(){
  Search.init()
})