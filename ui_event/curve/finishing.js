/*
 * @author Daisuke Homma
 */

new function() {  // block

// finishingPath state

Anima.CurveCreatorFinishingState = function(obj){
  this.stateObj = obj;
};
var self = Anima.CurveCreatorFinishingState;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.onMouseDown = function(e, self) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = Anima.Global.editor.getNewPath();

  var curve = this.stateObj.getCurve();
  curve.setSecondControlPoint(x, y);

  path.finished();
  Anima.Global.editor.addPath(path);
  Anima.Global.editor.setNewPath(null);

  this.selectNextState(this.stateObj.state.initial);

};

self.prototype.onMouseMove = function(e) {

  // you can't track right mouse dragging on Safari...
  // console.log("right mouse dragging...");

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
  curve.setSecondControlPoint(x, y);

  Anima.Global.editor.draw();

};

} // block

