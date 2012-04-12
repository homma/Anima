/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// change time frame //////////////////////////////////////////////////////////

self.prototype._setTimeFrame = function(frame) {

  this.deselectAll();

  this.newPath = null;
  this.pathList = frame.getPathList();

}

self.prototype._setTrack = function(track) {

  this.setTimeFrame( track.findOrCreateFrame(0) );

}

} // block

