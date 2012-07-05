/*
 * @author Daisuke Homma
 */

new function() {  // block

// mouseDragging state

an.CurveCreatorDraggingState = function(obj){
  this.stateObj = obj;
};
var self = an.CurveCreatorDraggingState;

// inherit from an.EventState;
self.prototype = new an.EventState();

self.prototype.onMouseMove = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
  var nextCurve = this.stateObj.getNextCurve();

  curve.setControlPointOne(x, y);

  var nextX = curve.p1x - (x - curve.p1x);
  var nextY = curve.p1y - (y - curve.p1y);

  nextCurve.setControlPointZero(nextX, nextY);

  an.g.editor.draw();

};

self.prototype.onMouseUp = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
  var nextCurve = this.stateObj.getNextCurve();

  curve.setControlPointOne(x, y);

  var nextX = curve.p1x - (x - curve.p1x);
  var nextY = curve.p1y - (y - curve.p1y);

  nextCurve.setControlPointZero(nextX, nextY);

  this.stateObj.setCurve(nextCurve);

  this.selectNextState(this.stateObj.state.hover);

};

} // block
