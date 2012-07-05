/*
 * @author Daisuke Homma
 */

new function() { // block

an.Animation = function() {

  this.initialize();

  an.g.animation = this;

};
var self = an.Animation;

self.prototype.initialize = function() {

  this.currentTrackIndex = 0;
  this.currentTimeFrameIndex = 0;
  this.trackList = [];
  this.framesPerSecond = 24;  // 24fps

  this.intervalID = null;
  this.nthFrame = 0;

  // not yet implemented
  this.animationLength = 60;
  this.loop = true;

};

} // block

