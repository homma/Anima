/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.TimeFrame = function() {

  this.frameNumber = null;
  this.pathList = [];

  this.initTimeFrame();
}
var self = Anima.TimeFrame;

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

