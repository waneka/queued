var Search = {
  init: function(){
    this.elem = $(document).find('.search-container')
    this.table = this.elem.find('.results-table')

    this.elem.find('.search-submit').on('click', Search.fetchSearchResults)
    this.elem.on('click', '.add-to-queue-submit', Search.addSongToQueue)
  },
  addSongToQueue: function(e) {
    Sync.addSongToQueue($(e.target).closest('tr'))
    Search.respondToBeingAdded($(e.target))
  },
  fetchSearchResults: function(){
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
    this.table.find('tr').remove()
  },
  displaySearchResults: function(response){
    // TODO: why the FIZUCK doesn't dataType: json above in the ajax call work?
    var data = JSON.parse(response)
    Search.resetSearchResults()
    $.each(data.result.results, function(i, result){
      Search.table.append(Search.buildResultRow(result))
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
