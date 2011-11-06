/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// change time frame //////////////////////////////////////////////////////////

self.prototype.setTimeFrame = function(frame) {

  this.deselectAll();

  this.newPath = null;
  this.pathList = frame.getPathList();

}

self.prototype.setTrack = function(track) {

  this.setTimeFrame( track.findOrCreateFrame(0) );

}

} // block

