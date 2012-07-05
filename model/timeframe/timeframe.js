/*
 * @author Daisuke Homma
 */

new function() { // block

an.TimeFrame = function() {

  this.frameNumber = null;
  this.pathList = [];

  this.initTimeFrame();
}
var self = an.TimeFrame;

self.prototype.initTimeFrame = function() {

}

self.prototype.setFrameNumber = function(nth) {

  this.frameNumber = nth;

}

self.prototype.getPathList = function() {

  return this.pathList;

}

self.prototype.getFrameNumber = function() {

  return this.frameNumber;

}

} // block

