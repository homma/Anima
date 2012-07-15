/*
 * @author Daisuke Homma
 */

// event handlers

new function() { //block

var self = an.TrackView;

/// register functions /////////////////////////////////////////////////////////

self.prototype.registerFunctions = function() {

  var thisObj = this;

  // track
  an.u.onClick("track_new", function(e) { thisObj.addTrack(); });
  an.u.onClick("track_delete",
               function(e) { thisObj.removeSelectedTrack(); });

  an.u.onClick("track_run",
               function(e) { thisObj.runOrStopAnimation(e); });

  // time frame
  an.u.onClick("track_prev",
               function(e) { thisObj.reduceStartTimeFrame(10); });
  an.u.onClick("track_next",
               function(e) { thisObj.addStartTimeFrame(10); });

}

} // block

