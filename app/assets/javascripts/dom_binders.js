function bindAddSong () {
  $('.icon-plus-sign').click(function(){
    $(this).addClass('selected')
    $(this).closest('.single-track').find('img').eq(0).addClass('disabled')
  })
}

function bindToggleSwitch() {
  // $('queue-container').hide()
  $('#search-toggle').on('click', function(){
    $('.search-container').toggle();
    $('.queue-container.main').toggle();
    $('.player').removeClass('expanded')
    $('.player-expanded-view').hide()
  })

  $('#queue-toggle').on('click', function(){
    $('.search-container').toggle();
    $('.queue-container.main').toggle();
    $('.player').removeClass('expanded')
    $('.player-expanded-view').hide()
  })
}

function bindPlayerExpander() {
  $('#art').on('click', function(){
    $('queue-container.main').toggle()
    $('.player').toggleClass('expanded')
    $('.player-expanded-view').toggle()
  })
}