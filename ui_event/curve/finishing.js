/*
 * @author Daisuke Homma
 */

new function() {  // block

// finishingPath state

an.CurveCreatorFinishingState = function(obj){
  this.stateObj = obj;
};
var self = an.CurveCreatorFinishingState;

// inherit from an.EventState;
self.prototype = new an.EventState();

self.prototype.onMouseDown = function(e, self) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = an.g.editor.getNewPath();

  var curve = this.stateObj.getCurve();
  curve.setControlPointOne(x, y);

  path.finished();
  an.g.editor.addPath(path);
  an.g.editor.setNewPath(null);

  this.selectNextState(this.stateObj.state.initial);

};

self.prototype.onMouseMove = function(e) {

  // you can't track right mouse dragging on Safari...
  // console.log("right mouse dragging...");

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
  curve.setControlPointOne(x, y);

  an.g.editor.draw();

};

} // block

