/*
 * @author Daisuke Homma
 */

// track data modifier

new function() { // block

var self = Anima.Track;

/// setter / getter ////////////////////////////////////////////////////////////

self.prototype.setSelected = function(flag) {
  this.selected = flag;
}

self.prototype.getSelected = function() {
  return this.selected;
}

self.prototype.setVisible = function(flag) {
  this.visible = flag;
}

self.prototype.getVisible = function() {
  return this.visible;
}

self.prototype.setName = function(name) {
  this.trackName = name;
}

self.prototype.getName = function() {
  return this.trackName;
}

/// timeframe management ///////////////////////////////////////////////////////

self.prototype.getNewFrame = function(nth) {

  var frame = new Anima.TimeFrame();
  frame.setFrameNumber(nth);
  this.frameList.push(frame);

  return frame;
};

self.prototype.addTimeFrame = function(timeframe) {

  this.frameList.push(timeframe);

};

self.prototype.removeTimeFrameAt = function(nth) {

  for(var i = 0; i < this.frameList.length; i++) {
    if(this.frameList[i].getFrameNumber() == nth) {
      this.frameList.splice(i, 1);

      return;
    }
  }

};

self.prototype.findOrCreateFrame = function(nth) {

  for(var i = 0; i < this.frameList.length; i++) {
    if(this.frameList[i].getFrameNumber() == nth) {
      // console.log("found at: " + i);
      return this.frameList[i];
    }
  }

  // console.log("couldn't find: " + nth);
  return this.getNewFrame(nth);
}

self.prototype.getTimeFrameNumberList = function() {

  var arr = [];

  for(var i = 0; i < this.frameList.length; i++) {
    arr.push( this.frameList[i].getFrameNumber() );
  }

  return arr;
}

self.prototype.hasTimeFrameAt = function(nth) {

  var arr = this.getTimeFrameNumberList();

  for(var i = 0; i < arr.length; i++) {
    if(arr[i] == nth) { return true };
  }

  return false;

}

} // block

