/*
 * @author Daisuke Homma
 */

// Track View

new function() { //block

Anima.TrackView = function() {
  // this.element = null;

  this.trackFields = [];
  // this.activeFields = 0;
  this.MaxFields = 7;             // constant
  this.MaxTimeFrames = 60;        // constant => 60 frames
  this.startFrame = 0;            // display from this.startFrame frame
  this.scrollGap = 0;

  this.initialize();

  Anima.Global.TrackView = this;

}
var self = Anima.TrackView;

self.prototype.initialize = function() {

  this.updateHeader();
  this.registerTracks();
  this.createTimeFrames();
  this.registerFunctions();

  this.addTrack();

}

} // block

