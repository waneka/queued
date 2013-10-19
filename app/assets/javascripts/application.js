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

  init: function() {
    this.el = $('.container')
    // listen()
    this.el.on('click', '.search-submit', this.fetchSearchResults.bind(this))

    var self = this
    this.el.on('click', '.add-to-queue-submit', function(e){
      self.addCloneToQueue($(e.target).closest('tr'))
      self.respondToBeingAdded($(e.target))
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
  },

  addCloneToQueue: function($elem){
    this.el.find('.queue-table').append($elem.clone()).find('.result-add').remove()
  },

  respondToBeingAdded: function($elem){
    //prop?
    $elem.prop('disabled', true)
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



// var myTemplate = $('[data-template-foo]').text()

// Mustache.render(myTemplate, data) // => html