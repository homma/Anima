/*
 * @author Daisuke Homma
 */

// event handlers

new function() { //block

var self = an.TrackView;

/// register functions /////////////////////////////////////////////////////////

self.prototype.registerOnClick = function(id, fun) {
  var elem = document.getElementById(id);
  elem.onclick = fun;
}

self.prototype.registerFunctions = function() {

  var thisObj = this;

  // track
  this.registerOnClick("track_new", function(e) { thisObj.addTrack(); });
  this.registerOnClick("track_delete",
                       function(e) { thisObj.removeSelectedTrack(); });

  this.registerOnClick("track_run",
                       function(e) { thisObj.runOrStopAnimation(e); });

  // time frame
  this.registerOnClick("track_prev",
                       function(e) { thisObj.reduceStartTimeFrame(10); });
  this.registerOnClick("track_next",
                       function(e) { thisObj.addStartTimeFrame(10); });

}

} // block

