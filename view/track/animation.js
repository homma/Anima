/*
 * @author Daisuke Homma
 */

// Animation

new function() { //block

var self = an.TrackView;

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

  an.g.animation.play();

};

self.prototype.stopAnimation = function() {

  an.g.animation.stop();

};

} // block

