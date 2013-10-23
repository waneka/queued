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
      self.resetSearchResults()
      self.displaySearchResults(JSON.parse(response))
    })
  },
  resetSearchResults: function(){
    this.table.find('tr').remove()
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
