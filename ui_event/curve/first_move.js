/*
 * @author Daisuke Homma
 */

new function() {  // block

// mouseInFirstMove state

Anima.CurveCreatorFirstMoveState = function(obj) {
  this.stateObj = obj;
};
var self = Anima.CurveCreatorFirstMoveState;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.onMouseMove = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
 
  curve.setFirstControlPoint(x, y);

  Anima.Global.editor.draw();

};

self.prototype.onMouseUp = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
  curve.setFirstControlPoint(x, y);

  this.selectNextState(this.stateObj.state.hover);

};

} // block

