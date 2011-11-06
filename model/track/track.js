/*
 * @author Daisuke Homma
 */

// track data

new function() { // block

Anima.Track = function() {
  this.selected = false;
  this.visible = true;
  this.trackName = "a Track";
  this.frameList = [];

  this.initTrack();
}
var self = Anima.Track;

self.prototype.initTrack = function() {

  var timeFrame = this.getNewFrame(0);

}

} // block

