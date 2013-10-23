function bindAddSong () {
  $(document).on('click', '.icon-plus-sign', function(){
    $(this).addClass('selected')
    $(this).closest('.single-track').find('img').eq(0).addClass('disabled')
  })
}

function bindToggleSwitch() {
  // $('queue-container').hide()
  $(document).on('click', '#search-toggle', function(){
    $('.search-container').toggle();
    $('.queue-container.main').toggle();
    $('.player').removeClass('expanded')
    $('.player-expanded-view').hide()
  })

  $(document).on('click', '#queue-toggle', function(){
    $('.search-container').toggle();
    $('.queue-container.main').toggle();
    $('.player').removeClass('expanded')
    $('.player-expanded-view').hide()
  })
}

function bindPlayerExpander() {
  $(document).on('click', '#art', function(){
    $('queue-container.main').toggle()
    $('.player').toggleClass('expanded')
    $('.player-expanded-view').toggle()
  })
}

