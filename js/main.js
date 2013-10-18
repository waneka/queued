var Controller = {
  listenForSubmitClick: function(button){
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
  }
}

var Views = {
  songQuery: function(data){
    return row = $('<tr>', { class: 'result-row'} )
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
  Controller.listenForSubmitClick()
})