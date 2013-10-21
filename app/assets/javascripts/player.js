
rdioPlayerElementId = 'rdio-player';

var Player = {
  playing: false
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

// the global callback object
var rdioCallbacks = {
  ready: function() {
    // Called once the API SWF has loaded and is ready to accept method calls.
    // find the embed/object element - i.e. the flash song player
    rdioPlayerElement = document.getElementById(rdioPlayerElementId);

    // interval function to check if queue has songs, runs every 3 seconds.
    checkInterval = setInterval(this.checkQueueLength,3000);
  },

  checkQueueLength: function() {
    // this.rdioPlayerElement == this.rdioPlayerElement || $('#' + rdioPlayerElementId).get(0)
  console.log(Player.playing)

    if ((($('.queue-row').length) > 0) && !Player.playing)  {
      rdioPlayerElement.rdio_play(Queue.nextSong())
      // clearInterval(checkInterval)
    } else {
      console.log("waiting for songs to be added or player has song")
    }
  },

  isSongAboutToEnd: function(position) {
    return ((position * 1000) > ((rdioCallbacks.currentSongDuration * 1000) - 100))
  }
};

// Callbacks
rdioCallbacks.playStateChanged = function playStateChanged(playState) {
  // The playback state has changed.
  // The state can be: 0 - paused, 1 - playing, 2 - stopped, 3 - buffering or 4 - paused.
  this.playState = playState
  if ((playState == 1) || (playState == 0)) {
    Player.playing = true
  } else {
    Player.playing = false
  }
  // $('#playState').text(playState);
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

rdioCallbacks.positionChanged = function positionChanged(position) {
  //The position within the track changed to position seconds.
  // This happens both in response to a seek and during playback.
  $('#position').text(position);

  if (this.isSongAboutToEnd(position)) {
      if ( ($('.queue-row').length) > 0) {
        rdioPlayerElement.rdio_play(Queue.nextSong());
      } else {
        // checkInterval = setInterval(rdioCallbacks.checkQueueLength,3000);
        return
      }
  }
}



