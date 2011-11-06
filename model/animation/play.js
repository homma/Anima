/*
 * @author Daisuke Homma
 */

new function() { // block

var self = Anima.Animation;

/// do animation ///////////////////////////////////////////////////////////////

self.prototype.play = function() {

  // this.nthFrame = 0;
  this.intervalID = window.setInterval(
                             function() { Anima.Global.animation.animate(); },
                             1000 / this.framesPerSecond);

}

self.prototype.stop = function() {

  window.clearInterval(this.intervalID);
  // this.endAnimation();
  this.backToFirstFrame();
  this.nthFrame = 0;
  this.intervalID = null;

  Anima.Global.editor.draw();
}

self.prototype.animate = function() {

  var nth = this.nthFrame;

  var track = this.getCurrentTrack();

  if( track.hasTimeFrameAt(nth) ) {

    var frame = track.findOrCreateFrame(nth);
    Anima.Global.editor.setTimeFrame(frame);
    Anima.Global.editor.draw();

  }

  this.nthFrame++;

}

self.prototype.endAnimation = function() {

  this.selectTimeFrame( this.getCurrentTrackIndex(),
                        this.getCurrentTimeFrameIndex() );

}

self.prototype.backToFirstFrame = function() {

  this.selectTimeFrame( 0, 0 );

}

} // block
