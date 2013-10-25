function bindAddSong () {
  $(document).on('click', '.overlay', function(){
    $(this).addClass('selected')
  })
}



function bindToggleSwitch() {
  // $('queue-container').hide()
  $(document).on('click', '#search-toggle', function(){
    $('.search-container').toggle();
    $('.queue-container.main').toggle();
    $('.player').removeClass('expanded')
    $('.player-expanded-view').hide()
    $('.container').removeClass('fixed')
  })

  $(document).on('click', '#queue-toggle', function(){
    $('.search-container').toggle();
    $('.queue-container.main').toggle();
    $('.player').removeClass('expanded')
    $('.player-expanded-view').hide()
    $('.container').removeClass('fixed')
  })
}

function bindPlayerExpander() {
  $(document).on('click', '#art', function(){
    $('.container').toggleClass('fixed')
    $('queue-container.main').toggle()
    $('.player').toggleClass('expanded')
    $('.player-expanded-view').toggle()
  })
}



