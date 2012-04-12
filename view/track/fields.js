/*
 * @author Daisuke Homma
 */

// Track Fields

new function() { //block

var self = Anima.TrackView;

/// add / remove fields ////////////////////////////////////////////////////////

self.prototype.registerTracks = function() {

  for(var i = 0; i < this.MaxFields; i++) {
    var enclosure = document.getElementById("enclosure_" + (i + 1) );
    var fieldObj = new Anima.TrackField(this, i, enclosure);
    this.trackFields.push(fieldObj);
  }

}

self.prototype.setAllFieldInvisible = function() {

  for(var i = 0; i < this.MaxFields; i++) {
    this.setFieldVisibility(i, false);
  }

}

self.prototype.setFieldVisibility = function(nth, flag) {

  var display = "none";
  var field = this.trackFields[nth];

  if(flag) {
    display = "inline-block";
  }

  var label = field.label;
  label.active.style.display = display;
  label.visibility.style.display = display;
  label.visibility.checked = true;
  label.trackName.style.display = display;

  var timeFrames = field.timeFrameContainer.timeFrameElems;
  for(var i = 0; i < timeFrames.length; i++) {
    timeFrames[i].style.display = display;
  }

}

/// update fields //////////////////////////////////////////////////////////////

self.prototype.updateView = function() {

  var trackObjects = Anima.Global.animation.getTrackList();

  var nTracks = trackObjects.length - this.scrollGap;

  this.setAllFieldInvisible();  // clear all the field.

  for(var i = 0; i < nTracks; i++) {
    var obj = trackObjects[i + this.scrollGap];

    this.updateField(i, obj);
  }

}

self.prototype.updateField = function(nth, obj) {

  this.setFieldVisibility(nth, true);

  this.markTrackSelected(nth, obj.isSelected() );
  this.updateTrackVisibility(nth, obj.getVisible() );
  this.updateTrackName(nth, obj.getName() );
  this.markTimeFrame(nth, obj);

}

/// scrolling up / down fields /////////////////////////////////////////////////

self.prototype.scrollUpFields = function() {

  if(this.scrollGap != 0) this.scrollGap--;

}

self.prototype.scrollDownFields = function() {

  var nTracks = Anima.Global.animation.getTrackList().length;

  if(nTracks - this.scrollGap > this.MaxFields) {
    this.scrollGap++;
  }

}

/// add / remove a track ///////////////////////////////////////////////////////

self.prototype.addTrack = function() {

  var track = Anima.Global.animation.getNewTrack();
  Anima.Global.editor.setTrack(track);

  var nTracks = Anima.Global.animation.getTrackList().length;
  if(nTracks > this.MaxFields) {
    this.scrollDownFields();
  }

  this.updateView();
}

self.prototype.removeSelectedTrack = function() {

  var nTracks = Anima.Global.animation.getTrackList().length;

  Anima.Global.animation.removeSelectedTrack();

  var nextToTheBottomLine = this.scrollGap + this.MaxFields + 1;
  if( Anima.Global.animation.isSelectedTrackBefore(nextToTheBottomLine) ) {
    this.scrollUpFields();
  }

  this.updateView();

}

/// set track attributes ///////////////////////////////////////////////////////

self.prototype.updateTrackVisibility = function(nth, flag) {

  var field = this.trackFields[nth];

  var label = field.label;
  label.visibility.checked = flag;

}

self.prototype.updateTrackName = function(nth, name) {

  var field = this.trackFields[nth];

  var label = field.label;
  label.trackName.value = name;

}

self.prototype.markTrackSelected = function(nth, flag) {

  var field = this.trackFields[nth];
  var label = field.label;

  if(flag) {
    label.active.style.color = "black";
  } else {
    label.active.style.color = "white";
  }

}

} // block

