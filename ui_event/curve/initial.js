/*
 * @author Daisuke Homma
 */

new function() {  // block

// mouseReleased state

an.CurveCreatorInitialState = function(obj) {
  this.stateObj = obj;
};
var self = an.CurveCreatorInitialState;

// inherit from an.EventState;
self.prototype = new an.EventState();

self.prototype.onMouseDown = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = new an.Path();
  an.g.editor.setNewPath(path);

  var curve = new an.Curve();

  curve.setAnchorPointZero(x, y);
  curve.setControlPointZero(x, y);

  this.stateObj.setCurve(curve);
  path.addEdge(curve);

  this.selectNextState(this.stateObj.state.firstMove);

};

} // block
