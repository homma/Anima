/*
 * @author Daisuke Homma
 */

new function() {  // block

// mouseReleased state

Anima.CurveCreatorInitialState = function(obj) {
  this.stateObj = obj;
};
var self = Anima.CurveCreatorInitialState;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.onMouseDown = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = new Anima.Path();
  Anima.Global.editor.setNewPath(path);

  var curve = new Anima.Curve();

  curve.setAnchorPointZero(x, y);
  curve.setControlPointZero(x, y);

  this.stateObj.setCurve(curve);
  path.addEdge(curve);

  this.selectNextState(this.stateObj.state.firstMove);

};

} // block
