var App = {
  listenForSubmitClick: function(button){
    var self = this
    $(document).on('click', '.search-submit', function(e){
      self.fetchSearchResults()
    })
  },

  fetchSearchResults: function(){
    //AJAX CALL TO GET SEARCH RESULTS
  }
}

$(document).ready(function(){
  App.listenForSubmitClick()
  console.log('ready')
})