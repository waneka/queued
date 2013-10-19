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

var Controller = {
  listenForSearchSubmitClick: function(){
    var self = this
    $(document).on('click', '.search-submit', function(e){
      self.fetchSearchResults()
    })
  },

  fetchSearchResults: function(){
    //AJAX CALL TO GET SEARCH RESULTS
    //done -> displaySearchResults(results)
  },

  displaySearchResults: function(data){
    $('.results-table').empty()
    $.each(data.result.results, function(i, result){
      $('.results-table').append(Views.songQuery(result))
    })
  },

  listenForAddToQueueSubmitClick: function(){
    var self = this
    $(document).on('click', '.add-to-queue-submit', function(e){
      self.addCloneToQueue($(e.target).closest('tr'))
      self.respondToBeingAdded($(e.target))
    })
  },

  addCloneToQueue: function($elem){
    $('.queue-table').append($elem.clone()).find('.result-add').remove()
  },

  respondToBeingAdded: function($elem){
    $elem.attr('disabled', true)
  }
}

var Views = {
  songQuery: function(data){
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

$(document).ready(function(){
  Controller.listenForSearchSubmitClick()
  Controller.listenForAddToQueueSubmitClick()
})