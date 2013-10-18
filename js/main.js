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
    $('.results-list').empty()
    $.each(data.result.results, function(i, result){
      $('.results-list').append(Views.songItem(result))
    })
  }
}

var Views = {
  songItem: function(data){
    var songTitle = data.name; var artistName = data.artist; var albumTitle = data.album;
    $elem = $('<li>').text(songTitle+" - "+artistName+" ("+albumTitle+")")
    return $elem
  }
}

$(document).ready(function(){
  Controller.listenForSubmitClick()
})