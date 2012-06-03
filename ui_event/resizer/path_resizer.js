/*
 * @author Daisuke Homma
 */

new function() { // block

var gl = Anima.Global;

Anima.PathResizer = function() {

  this.position = null;
  gl.PathResizer = this;

};
var self = Anima.PathResizer;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.test = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (resize guide)
  var hitResizeGuide = gl.editor.isOnHandle(x, y);
  if(hitResizeGuide) {

    this.position = hitResizeGuide.position;
    return true;

  }

  return false;

}

self.prototype.select = function(obj) {

  this.selectSelf();

};

self.prototype.deselect = function() {

  this.position = null;
  this.deselectSelf();

};

self.prototype.onMouseDown = function(e) {

  if( this.test(e) ) { return; }

  // move path
  eventObj = gl.PathMover;
  if( eventObj.test(e) ) { return; };

  // otherwise deselect
  gl.editor.deselectAll();
  gl.editor.draw();
  gl.pathInspectorView.update();  // update the path info pane

}

self.prototype.onMouseMove = function(e) {

  if( !this.position ) { return; }
  this.resizePath(e);

}

self.prototype.onMouseUp = function(e) {

  if( !this.position ) { return; }
  this.deselect();

};

// need fix
self.prototype.resizePath = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);

  var handles = gl.editor.getResizeArea();
  var p = this.position;

  // 0 - 7 - 3
  // 4       6
  // 1 - 5 - 2
  var diffX = 0;
  if( (p == 0) || (p == 1) || (p == 4) ) {
    diffX = position.x - handles.x[p];
  }
  if(handles.x[3] == handles.x[0]) {
    diffX = 0;
  }

  var diffY = 0;
  if( (p == 0) || (p == 3) || (p == 7) ) {
    diffY = position.y - handles.y[p];
  }
  if(handles.y[1] == handles.y[0]) {
    diffY = 0;
  }

  var w;
  if( (p == 0) || (p == 1) || (p == 4) ) {
    w = handles.x[3] - position.x;
  } else if( (p == 3) || (p == 6) || (p == 2) ) {
    w = position.x - handles.x[0];
  } else {
    w = handles.x[3] - handles.x[0];
  }
  if(w < 0) {
    w = 0;
  }

  var scaleX = w / (handles.x[3] - handles.x[0]);
  if(handles.x[3] == handles.x[0]) {
    scaleX = 0;
  }

  var h;
  if( (p == 0) || (p == 7) || (p == 3) ) {
    h = handles.y[1] - position.y;
  } else if( (p == 1) || (p == 5) || (p == 2) ) {
    h = position.y - handles.y[0];
  } else {
    h = handles.y[1] - handles.y[0];
  }
  if(h < 0) {
    h = 0;
  }

  var scaleY = h / (handles.y[1] - handles.y[0]);;
  if(handles.y[1] == handles.y[0]) {
    scaleY = 0;
  }

  var fromX = handles.x[0];
  var fromY = handles.y[0];

  gl.editor.resizeSelectedPaths(fromX, fromY, scaleX, scaleY);
  gl.editor.translateSelectedPaths(diffX, diffY);

  gl.editor.draw();

  // console.log(diffX, diffY);
};

} // block
