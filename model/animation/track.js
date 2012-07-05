/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.Animation;

/// track creation /////////////////////////////////////////////////////////////

self.prototype.getNewTrack = function() {

  var track = new an.Track();

  this.trackList.push(track);

  // marking the track as selected
  this.selectTrack(track);

  return track;

};

self.prototype.addTrack = function(track) {

  this.trackList.push(track);
  this.selectTrack(track);

};

/// track selection ////////////////////////////////////////////////////////////

self.prototype.selectTrack = function(track) {

  for(var i = 0; i < this.trackList.length; i++) {
    if(track == this.trackList[i]) {
      this.trackList[i].setSelected(true);
    } else {
      this.trackList[i].setSelected(false);
    }
  }

}

self.prototype.selectTrackAt = function(nth) {

  // making sure that there are no other selected track.
  for(var i = 0; i < this.trackList.length; i++) {
    this.trackList[i].setSelected(false);
  }

  this.trackList[nth].setSelected(true);

}

self.prototype.isSelectedTrackBefore = function(nth) {
  for(var i = 0; i < this.trackList.length; i++) {
    if( this.trackList[i].isSelected() ) {
      if(i < nth) { return true; } else { return false; };
    }
  }

}

self.prototype.getTrackList = function() {
  return this.trackList;
}

/// time frame selection ///////////////////////////////////////////////////////

self.prototype.getCurrentTrackIndex = function() {
  return this.currentTrackIndex;
}

self.prototype.getCurrentTimeFrameIndex = function() {
  return this.currentTimeFrameIndex;
}

self.prototype.selectTimeFrame = function(nthTrack, nthTime) {

  // console.log("time frame selected at: " + nthTrack + ", " + nthTime);

  this.currentTrackIndex = nthTrack;
  this.currentTimeFrameIndex = nthTime;

  var track = this.trackList[nthTrack];
  var frame = track.findOrCreateFrame(nthTime);

  an.g.editor.setTimeFrame(frame);

}

/// track removal //////////////////////////////////////////////////////////////

self.prototype.removeSelectedTrack = function() {

  if(this.trackList.length <= 1) return;

  for(var i = 0; i < this.trackList.length; i++) {
    if( this.trackList[i].isSelected() ) {

      if(i == this.trackList.length - 1) {
        this.selectTrackAt(i - 1);
      } else {
        this.selectTrackAt(i + 1);
      }

      this.trackList.splice(i, 1);
      return;
    }
  }

}

/*
self.prototype.removeTrack = function(track) {

  if(this.TrackList.length <= 1) return;

  for(var i = 0; i < this.trackList.length; i++) {
    if(track == this.trackList[i]) {
      // if(this.trackList[i].isSelected())
      // ...
      this.trackList.splice(i, 1);
      return;
    }
  }

}

self.prototype.removeTrackAt = function(nth) {

  if(this.TrackList.length <= 1) return;

  // if(this.trackList[nth].isSelected())
  // ...

  this.trackList.splice(nth, 1);
}
*/

/// track pick up //////////////////////////////////////////////////////////////

self.prototype.getTrackBeforeThis = function(track) {
  if(track == this.trackList[0]) {
    return null;
  }

  for(var i = 1; i < this.trackList.length; i++) {
    if(track == this.trackList[i]) {
      return this.trackList[i - 1];
    }
  }

  return null;
}

self.prototype.getCurrentTrack = function() {

  return this.trackList[this.getCurrentTrackIndex()];

}

/// moving selected track back and forth ///////////////////////////////////////

self.prototype.bringFront = function(track) {
  if(track == this.trackList[0]) {
    return;
  }

  for(var i = 1; i < this.trackList.length; i++) {

    if(track == this.trackList[i]) {
      this.trackList[i] = this.trackList[i - 1];
      this.trackList[i - 1] = track;

      return;
    }

  }

}

self.prototype.bringBack = function(track) {

  for(var i = 0; i < this.trackList.length - 1; i++) {

    if(track == this.trackList[i]) {
      this.trackList[i] = this.trackList[i + 1];
      this.trackList[i + 1] = track;

      return;
    }

  }

}

self.prototype.bringFrontMost = function(track) {

  for(var i = 0; i < this.trackList.length; i++) {

    if(track == this.trackList[i]) {
      this.trackList.splice(i, 1);
      break;
    }

  }
  this.trackList.unshift(track);

}

self.prototype.bringBackMost = function(track) {

  for(var i = 0; i < this.trackList.length; i++) {

    if(track == this.trackList[i]) {
      this.trackList.splice(i, 1);
      break;
    }

  }
  this.trackList.push(track);

}

} // block

