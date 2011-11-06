/*
 * @author Daisuke Homma
 */

new function() {  // block

// mouseDragging state

Anima.CurveCreatorDraggingState = function(obj){
  this.stateObj = obj;
};
var self = Anima.CurveCreatorDraggingState;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.onMouseMove = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
  var nextCurve = this.stateObj.getNextCurve();

  curve.setSecondControlPoint(x, y);

  var nextX = curve.p1x - (x - curve.p1x);
  var nextY = curve.p1y - (y - curve.p1y);

  nextCurve.setFirstControlPoint(nextX, nextY);

  Anima.Global.editor.draw();

};

self.prototype.onMouseUp = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
  var nextCurve = this.stateObj.getNextCurve();

  curve.setSecondControlPoint(x, y);

  var nextX = curve.p1x - (x - curve.p1x);
  var nextY = curve.p1y - (y - curve.p1y);

  nextCurve.setFirstControlPoint(nextX, nextY);

  this.stateObj.setCurve(nextCurve);

  this.selectNextState(this.stateObj.state.hover);

};

} // block
