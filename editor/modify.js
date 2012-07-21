/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// change time frame //////////////////////////////////////////////////////////

self.prototype.setTimeFrame = function(frameToSet) {

  this.frame = frameToSet;

  this.interface.deselectAll();

  this.newPath = null;
  this.pathList = frameToSet.getPathList();

}

self.prototype.getTimeFrame = function() {

  return this.frame;

}

self.prototype.setTrack = function(trackToSet) {

  this.track = trackToSet;
  this.interface.setTimeFrame( trackToSet.findOrCreateFrame(0) );

}

self.prototype.getTrack = function() {

  return this.track;

}

} // block

