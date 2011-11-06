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

  // var edge = new Anima.Move(x, y);
  // path.addEdge(edge);
  // path.setBeginPoint(x, y);

  var curve = new Anima.Curve();

  curve.setFirstPoint(x, y);
  curve.setFirstControlPoint(x, y);

  this.stateObj.setCurve(curve);
  path.addEdge(curve);

  this.selectNextState(this.stateObj.state.firstMove);

};

} // block
