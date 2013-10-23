function bindAddSong () {
  $('.icon-plus-sign').click(function(){
    $(this).addClass('selected')
    $(this).closest('.single-track').find('img').eq(0).addClass('disabled')
  })
}

function bindToggleSwitch() {
  // $('queue-container').hide()
  var playerExpanded = false;
  $('#search-toggle').on('click', function(){

    $('.search-container').toggle();
    $('.current-track-info').toggle();
    if (playerExpanded) {
      $('.player').toggleClass('expanded')
      playerExpanded = false
    } else {
      $('.player').toggleClass('expanded')
      playerExpanded = true
    }
  })

  $('#queue-toggle').on('click', function(){
    $('.search-container').toggle();
    $('.current-track-info').toggle();
    if (playerExpanded) {
      $('.player').toggleClass('expanded')
      playerExpanded = false
    } else {
      $('.player').toggleClass('expanded')
      playerExpanded = true
    }
  })
}