var Search = {
  init: function(){
    this.elem = $(document).find('.search-container')
    this.container = this.elem.find('.results-container')

    this.elem.find('.search-submit').on('click', Search.fetchSearchResults)
    this.elem.on('click', '.add-to-queue-submit', Search.addSongToQueue)
  },
  addSongToQueue: function(e) {
    Sync.addSongToQueue($(e.target).closest('div').parent())
  },
  fetchSearchResults: function(e){
    e.preventDefault()

    var term = Search.elem.find('.search-input-term').val()
    $.ajax({
      url: '/search',
      type: 'post',
      data: {song: term},
      dataType: 'json'
    })
    .done(Search.displaySearchResults)
  },
  resetSearchResults: function(){
    this.container.find('div').remove()
  },
  displaySearchResults: function(response){
    // TODO: why the FIZUCK doesn't dataType: json above in the ajax call work?
    var data = JSON.parse(response)
    Search.resetSearchResults()
    $.each(data.result.results, function(i, result){
      Search.container.append(Search.buildResultRow(result))
    })
  },
  //TODO: STOP CHOPPING CHARACTERS
  limitCharacters: function(str){
    var limit = 30
    return str.substring(0,limit-1)
  },
  buildResultRow: function(data){
    var icon = "<i class='icon-plus icon-2x add-to-queue-submit'></i>"

    return $('<div>', {class: 'pure-u-1-8 single-track result'} ).data('songkey', data.key)
    .append(
      $('<img>', {src: data.icon, class: 'front-page-art result-album-art'}),
      $('<div>', {class: 'result-song-details'})
      .append(
        $('<span>', {class: 'result-artist'} ).text(this.limitCharacters(data.artist)),
        $('<span>', {class: 'result-song'} ).text(this.limitCharacters(data.name)),
        $('<span>', {class: 'result-album'} ).html(this.limitCharacters(data.album)+icon)
      )
    )
  }
}
