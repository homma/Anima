/*
 * @author Daisuke Homma
 */

// Time Frames

new function() { //block

var self = an.TrackView;

/// initialize /////////////////////////////////////////////////////////////////

self.prototype.createTimeFrames = function() {

  for(var i = 0; i < this.trackFields.length; i++) {

    var container = this.trackFields[i].timeFrameContainer;

    if(container) {
      this.createTimeFramesIn(container);
    }

  }

}

self.prototype.createTimeFramesIn = function(container) {

  var node = container.elem;

  for(var i = 0; i < 60; i++) {
    var d = document.createElement("div");
    if( i % 10 == 0 ) {
      d.setAttribute("class", "tenth_frame");
    } else {
      d.setAttribute("class", "frame");
    }
    d.onclick = function(e) { container.onClick(e.target); };
    container.timeFrameElems.push(d);
    node.appendChild(d);
  }

}

/// update header //////////////////////////////////////////////////////////////

self.prototype.updateHeader = function() {

  var n = this.startFrame;

  for(var i = 0; i < this.MaxTimeFrames; i += 10) {
    var count = n + i;
    var timeCounter = document.getElementById("frame_counter_" + (i / 10 + 1));
    if(count == 0) {
      timeCounter.textContent = "00";
    } else {
      timeCounter.textContent = count;
    }
  }

}

/// update fields //////////////////////////////////////////////////////////////

self.prototype.markTimeFrame = function(nthField, trackObj) {

  var field = this.trackFields[nthField];
  var timeFrameContainer = field.timeFrameContainer;

  for(var i = 0; i < this.MaxTimeFrames; i++) {
    var nthFrame = i + this.startFrame;
    if( trackObj.hasTimeFrameAt(nthFrame) ) {
      timeFrameContainer.timeFrameElems[i].style.background = "dimgray";
    } else {
      timeFrameContainer.timeFrameElems[i].style.background = "white";
    }

  }

  // display current frame in red
  var animation = an.g.animation;
  var track = animation.getCurrentTrackIndex();
  var frame = animation.getCurrentTimeFrameIndex();

  if( track == nthField ) {
    frame -= this.startFrame;  // index in time frame container
    if( (0 <= frame) && (frame < this.MaxTimeFrames) ) {
      timeFrameContainer.timeFrameElems[frame].style.background = "red";
    }
  }

}

/// modify time frame table ////////////////////////////////////////////////////

self.prototype.selectTimeFrame = function(nthField, nthFrame) {

  var nthTrack = this.scrollGap + nthField;
  var nthTimeFrame = this.getStartFrame() + nthFrame;

  an.g.animation.selectTimeFrame( nthTrack, nthTimeFrame );
  an.g.editor.draw();

  this.updateView();
};

/// move time frame display forward / backward /////////////////////////////////

self.prototype.getStartFrame = function() {

  return this.startFrame;

}

self.prototype.setStartFrame = function(n) {

  this.startFrame = n;

  this.updateHeader();
  this.updateView();

}

self.prototype.addStartTimeFrame = function(n) {

  var nth = this.startFrame + n;
  this.setStartFrame(nth);

}

self.prototype.reduceStartTimeFrame = function(n) {

  var nth = this.startFrame - n;

  if(nth < 0) {
    nth = 0;
  }

  this.setStartFrame(nth);
}

} // block

