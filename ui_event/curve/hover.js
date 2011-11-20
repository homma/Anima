/*
 * @author Daisuke Homma
 */

new function() {  // block

// mouseUp state

Anima.CurveCreatorHoverState = function(obj) {
  this.stateObj = obj;
};
var self = Anima.CurveCreatorHoverState;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.onMouseDown = function(e) {

  if(e.button == 2) {
    this.onRightMouseDown(e);
  } else {
    this.onLeftMouseDown(e);
  };

};

self.prototype.onLeftMouseDown = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
  curve.setAnchorPointOne(x, y);
  curve.setControlPointOne(x, y);

  var nextCurve = new Anima.Curve();
  nextCurve.setAnchorPointZero(x, y);

  this.stateObj.setNextCurve(nextCurve);

  var path = Anima.Global.editor.newPath;
  path.addEdge(nextCurve);

  this.selectNextState(this.stateObj.state.dragging);

};

self.prototype.onRightMouseDown = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
  curve.setAnchorPointOne(x, y);
  curve.setControlPointOne(x, y);

  this.selectNextState(this.stateObj.state.finishing);

};

self.prototype.onMouseMove = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var curve = this.stateObj.getCurve();
  curve.setAnchorPointOne(x, y);
  curve.setControlPointOne(x, y);

  Anima.Global.editor.draw();

};

self.prototype.onDblClick = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var path = Anima.Global.editor.getNewPath();

  // double click => additional two curves...
  path.removeLastEdge();
  path.removeLastEdge();

  path.finished();
  Anima.Global.editor.addPath(path);
  Anima.Global.editor.setNewPath(null);

  this.selectNextState(this.stateObj.state.initial);

};

} // block
