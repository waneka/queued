var nick_queue = {
  songs: ["t12t1259537", "t1259409", "t1259319", "t1259449", "t1259361"]
}



$(document).ready(function() {

  swfobject.embedSWF(
    'http://www.rdio.com/api/swf/', // the location of the Rdio Playback API SWF
    rdioPlayerElementId, // the ID of the element that will be replaced with the SWF
    // dont know ?
    1, 1, '9.0.0', 'expressInstall.swf',
    // variables that will be made available to the flashplayer
    {
      'playbackToken': playback_token,
      'domain': domain,
      'listener': 'rdioCallbacks'  // A global that the player can see and will call functions on
    },
    // allow the player to access js variables
    { 'allowScriptAccess': 'always' }
  );



});

var rdioPlayerElementId = 'rdio-player';


// the global callback object
var rdioCallbacks = {};
var rdioPlayerElement = null;
var checkInterval = null;
// called once the flash player has dowloaded, then connected to rdio
rdioCallbacks.ready = function ready(user) {
  // Called once the API SWF has loaded and is ready to accept method calls.

  // find the embed/object element - i.e. the flash song player
  // var apiswf = $('#apiswf').get(0);
  rdioPlayerElement = document.getElementById(rdioPlayerElementId);

  // rdioPlayerElement.rdio_play(nick_queue.songs.pop());

checkInterval = setInterval(checkQueueLength,3000);

function checkQueueLength() {
  console.log("checking length")
  if (($('.queue-row').length) > 0) {
    rdioPlayerElement.rdio_play(Queue.nextSong())
    clearInterval(checkInterval)
  } else {
    console.log("waiting for songs to be added")
  }
}
  // set up the controls


  $('#stop').click(function() { rdioPlayerElement.rdio_stop(); });
  $('#pause').click(function() { rdioPlayerElement.rdio_pause(); });
  $('#previous').click(function() { rdioPlayerElement.rdio_previous(); });
  $('#next').click(function() { rdioPlayerElement.rdio_next(); });


  // $('#play').click(function() {
  //   rdioPlayerElement.rdio_play($('#play_key').val());
  // });



  // apiswf.rdio_startFrequencyAnalyzer({
  //   frequencies: '10-band',
  //   period: 100
  // });

  //   if (user == null) {
  //     $('#nobody').show();
  //   } else if (user.isSubscriber) {
  //     $('#subscriber').show();
  //   } else if (user.isTrial) {
  //     $('#trial').show();
  //   } else if (user.isFree) {
  //     $('#remaining').text(user.freeRemaining);
  //     $('#free').show();
  //   } else {
  //     $('#nobody').show();
  //   }

}


rdioCallbacks.freeRemainingChanged = function freeRemainingChanged(remaining) {
  $('#remaining').text(remaining);
}

rdioCallbacks.playStateChanged = function playStateChanged(playState) {
  // The playback state has changed.
  // The state can be: 0 - paused, 1 - playing, 2 - stopped, 3 - buffering or 4 - paused.
  $('#playState').text(playState);
}

rdioCallbacks.playingTrackChanged = function playingTrackChanged(playingTrack, sourcePosition) {
  // The currently playing track has changed.
  // Track metadata is provided as playingTrack and the position within the playing source as sourcePosition.
  this.currentSongDuration = playingTrack.duration
  if (playingTrack != null) {
    $('#track').text(playingTrack['name']);
    $('#album').text(playingTrack['album']);
    $('#artist').text(playingTrack['artist']);
    $('#art').attr('src', playingTrack['icon']);
  }
}

rdioCallbacks.playingSourceChanged = function playingSourceChanged(playingSource) {
  // The currently playing source changed.
  // The source metadata, including a track listing is inside playingSource.
}

rdioCallbacks.volumeChanged = function volumeChanged(volume) {
  // The volume changed to volume, a number between 0 and 1.
}

rdioCallbacks.muteChanged = function muteChanged(mute) {
  // Mute was changed. mute will either be true (for muting enabled) or false (for muting disabled).
}

rdioCallbacks.positionChanged = function positionChanged(position) {
  //The position within the track changed to position seconds.
  // This happens both in response to a seek and during playback.
  $('#position').text(position);

  aboutToEnd(position)

}

function aboutToEnd(position){
  if ((position * 1000) > ((rdioCallbacks.currentSongDuration * 1000) - 100)) {
    if (($('.queue-row').length) > 0) {
      rdioPlayerElement.rdio_play(Queue.nextSong());
    } else {
      checkInterval = setInterval(checkQueueLength,3000);
      // console.log(checkInterval)
      function checkQueueLength() {
        console.log("checking length")
        if (($('.queue-row').length) > 0) {
          rdioPlayerElement.rdio_play(Queue.nextSong())
          clearInterval(checkInterval)
        } else {
          console.log("waiting for songs to be added")
        }
      }
    }
  } 
}

rdioCallbacks.queueChanged = function queueChanged(newQueue) {
  // The queue has changed to newQueue.
}

rdioCallbacks.shuffleChanged = function shuffleChanged(shuffle) {
  // The shuffle mode has changed.
  // shuffle is a boolean, true for shuffle, false for normal playback order.
}

rdioCallbacks.repeatChanged = function repeatChanged(repeatMode) {
  // The repeat mode change.
  // repeatMode will be one of: 0: no-repeat, 1: track-repeat or 2: whole-source-repeat.
}

rdioCallbacks.playingSomewhereElse = function playingSomewhereElse() {
  // An Rdio user can only play from one location at a time.
  // If playback begins somewhere else then playback will stop and this callback will be called.
}

rdioCallbacks.updateFrequencyData = function updateFrequencyData(arrayAsString) {
  // Called with frequency information after apiswf.rdio_startFrequencyAnalyzer(options) is called.
  // arrayAsString is a list of comma separated floats.

  var arr = arrayAsString.split(',');

  $('#freq div').each(function(i) {
    $(this).width(parseInt(parseFloat(arr[i])*500));
  })
}

