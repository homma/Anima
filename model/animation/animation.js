/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.Animation = function() {

  this.initialize();

  Anima.Global.animation = this;

};
var self = Anima.Animation;

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

