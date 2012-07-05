/*
 * @author Daisuke Homma
 */

new function() {  // block

// mouseInFirstMove state

an.CurveCreatorFirstMoveState = function(obj) {
  this.stateObj = obj;
};
var self = an.CurveCreatorFirstMoveState;

// inherit from an.EventState;
self.prototype = new an.EventState();

self.prototype.onMouseMove = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
 
  curve.setControlPointZero(x, y);

  an.g.editor.draw();

};

self.prototype.onMouseUp = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
  curve.setControlPointZero(x, y);

  this.selectNextState(this.stateObj.state.hover);

};

} // block

