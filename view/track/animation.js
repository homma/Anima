/*
 * @author Daisuke Homma
 */

// Animation

new function() { //block

var self = Anima.TrackView;

/// do animations //////////////////////////////////////////////////////////////

self.prototype.runOrStopAnimation = function(e) {
//  var runButton = document.getElementById("track_run");
  var runButton = e.target;

  // console.log(runButton.innerText);

  if(runButton.innerText == "run") {
    runButton.innerText = "stop";
    this.runAnimation();
  } else {
    runButton.innerText = "run";
    this.stopAnimation();
  }
};

self.prototype.runAnimation = function() {

  Anima.Global.animation.play();

};

self.prototype.stopAnimation = function() {

  Anima.Global.animation.stop();

};

} // block

