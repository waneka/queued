function bindAddSong() {
  $('.overlay').click(function(){
    console.log("click")
    $(this).addClass('selected')
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

