var Player = {
  playing: false,
  pause: function(){
    rdioPlayerElement.rdio_pause();
  },
  play: function(){
    rdioPlayerElement.rdio_play();
  },
  next: function() {
    rdioPlayerElement.rdio_stop();
  }
};

// the global callback object
var RdioCallbacks = {
  ready: function() {
    // Called once the API SWF has loaded and is ready to accept method calls.
    // find the embed/object element - i.e. the flash song player
    console.log("2: rdioPlayerElementId =", this.rdioPlayerElementId);
    rdioPlayerElement = document.getElementById(this.rdioPlayerElementId);

    // interval function to check if queue has songs, runs every 3 seconds.
    checkInterval = setInterval(this.checkQueueLength,3000);

    $("#pause").click(function(){
      $(this).toggleClass('color', 'red')
      Player.pause()
    })

    $('#play').click(function(){
      Player.play()
    })

    $('#next').click(function(){
      Player.next()
    })
  },

  checkQueueLength: function() {
    // this.rdioPlayerElement == this.rdioPlayerElement || $('#' + rdioPlayerElementId).get(0)
  // console.log(Player.playing)

    if ((($('.queue-item').length) > 0) && !Player.playing)  {
      rdioPlayerElement.rdio_play(Queue.nextSong())

    } else {
      // console.log("waiting for songs to be added or player has song")
    }
  },

  isSongAboutToEnd: function(position) {
    return ((position * 1000) > ((RdioCallbacks.currentSongDuration * 1000) - 1000))
  },

  playStateChanged: function(playState) {
    // The playback state has changed.
    // The state can be: 0 - paused, 1 - playing, 2 - stopped, 3 - buffering or 4 - paused.
    this.playState = playState
    if ((playState == 1) || (playState == 0 || (playState == 4))) {
      Player.playing = true
    } else {
      Player.playing = false
    }
  },

  playingTrackChanged: function(playingTrack, sourcePosition) {
    // The currently playing track has changed.
    // Track metadata is provided as playingTrack and the position within the playing source as sourcePosition.
    this.currentSongDuration = playingTrack.duration
    if (playingTrack != null) {
      $('#track').text(playingTrack['name']);
      $('#album').text(playingTrack['album']);
      $('#artist').text(playingTrack['artist']);
      $('#art').attr('src', playingTrack['icon']);
    }
  },

  positionChanged: function(position) {
    //The position within the track changed to position seconds.
    // This happens both in response to a seek and during playback.
    $('#position').text(position);

    if (this.isSongAboutToEnd(position)) {
      if ( ($('.queue-item').length) > 0) {
        rdioPlayerElement.rdio_play(Queue.nextSong());
      } else {

        return
      }
    }
  }
}


$(document).ready(function() {
  RdioCallbacks.rdioPlayerElementId = 'rdio-player';

  swfobject.embedSWF(
    'http://www.rdio.com/api/swf/', // the location of the Rdio Playback API SWF
    RdioCallbacks.rdioPlayerElementId, // the ID of the element that will be replaced with the SWF
    // dont know ?
    1, 1, '9.0.0', 'expressInstall.swf',
    // variables that will be made available to the flashplayer
    {
      'playbackToken': playback_token,
      'domain': domain,
      'listener': 'RdioCallbacks'  // A global that the player can see and will call functions on
    },
    // allow the player to access js variables
    { 'allowScriptAccess': 'always' }
  );

});
