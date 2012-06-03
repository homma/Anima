/*
 * @author Daisuke Homma
 */

new function() { // block

var gl = Anima.Global;

Anima.CurveModifier = function() {

  this.hitEdge = null;

  gl.CurveModifier = this;

};
var self = Anima.CurveModifier;

// inherit from Anima.EventState
self.prototype = new Anima.EventState();

self.prototype.test = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (transform handle)
  var hitEdge = gl.editor.isOnHandle(x, y);
  if(hitEdge) {

    this.hitEdge = hitEdge;
    return true;

  }

  this.hitEdge = null;
  return false;
}

self.prototype.select = function() {

  this.selectSelf();

}

self.prototype.deselect = function() {

  this.hitEdge = null;
  this.deselectSelf();

}

self.prototype.onMouseDown = function(e) {

  if( this.test(e) ) { return; }

  var eventObj;

  // move path
  eventObj = gl.PathMover;
  if( eventObj.test(e) ) { return; };

  // otherwise deselect
  gl.editor.deselectAll();
  gl.editor.draw();
  gl.pathInspectorView.update();  // update the path info pane

};

self.prototype.onMouseMove = function(e) {

  if(!this.hitEdge) { return; }

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  gl.editor.modifyPoint(this.hitEdge, x, y);
  gl.editor.draw();

};

self.prototype.onMouseUp = function(e) {

  if(!this.hitEdge) { return; }

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  gl.editor.modifyPoint(this.hitEdge, x, y);
  gl.editor.draw();

  this.hitEdge = null;
};

} // block
