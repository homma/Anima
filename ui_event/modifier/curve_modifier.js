/*
 * @author Daisuke Homma
 */

new function() { // block

an.CurveModifier = function() {

  this.hitEdge = null;
  this.hitPoint = null;

  an.g.CurveModifier = this;

};
var self = an.CurveModifier;

// inherit from an.EventState
self.prototype = new an.EventState();

self.prototype.test = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (transform handle)
  var hitInfo = an.g.editor.isOnHandle(x, y);
  if(hitInfo) {

    this.hitEdge = hitInfo.curve;
    this.hitPoint = hitInfo.point;
    return true;

  }

  this.hitEdge = null;
  this.hitPoint = null;
  return false;
}

self.prototype.select = function() {

  this.selectSelf();

}

self.prototype.deselect = function() {

  this.hitEdge = null;
  this.hitPoint = null;
  this.deselectSelf();

}

self.prototype.onMouseDown = function(e) {

  if( this.test(e) ) { return; }

  var eventObj;

  // move path
  eventObj = an.g.PathMover;
  if( eventObj.test(e) ) { return; };

  // otherwise deselect
  an.g.editor.deselectAll();
  an.g.editor.draw();
  an.g.pathInspectorView.update();  // update the path info pane

};

self.prototype.onMouseMove = function(e) {

  if(!this.hitEdge) { return; }

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  an.g.editor.modifyPoint(this.hitEdge, this.hitPoint, x, y);
  an.g.editor.draw();

};

self.prototype.onMouseUp = function(e) {

  if(!this.hitEdge) { return; }

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  an.g.editor.modifyPoint(this.hitEdge, this.hitPoint, x, y);
  an.g.editor.draw();

  this.hitEdge = null;
  this.hitPoint = null;

};

} // block
