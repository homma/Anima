/*
 * @author Daisuke Homma
 */

new function() { // block

an.PathResizer = function() {

  this.position = null;
  an.g.PathResizer = this;

};
var self = an.PathResizer;

// inherit from an.EventState;
self.prototype = new an.EventState();

self.prototype.test = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (resize guide)
  var hitResizeGuide = an.g.editor.isOnHandle(x, y);
  if(hitResizeGuide) {

    this.position = hitResizeGuide.position;
    return true;

  }

  return false;

}

self.prototype.initialize = function() {

  this.position = null;

}

self.prototype.select = function() {

  this.selectSelf();

};

self.prototype.deselect = function() {

  this.initialize();

};

self.prototype.onMouseDown = function(e) {

  // hit and continue
  if( this.test(e) ) { return; }

  // move path
  eventObj = an.g.PathMover;
  if( eventObj.test(e) ) { return; };

  // otherwise deselect
  an.g.editor.deselectAll();
  an.g.editor.draw();
  an.g.pathInspectorView.update();  // update the path info pane

}

self.prototype.onMouseMove = function(e) {

  if( !this.position ) { return; }
  this.resizePath(e);

}

self.prototype.onMouseUp = function(e) {

  if( !this.position ) { return; }
  this.initialize();

};

// need fix
self.prototype.resizePath = function(e) {

  var position = an.u.getMousePositionInCanvas(e);

  var handles = an.g.editor.getResizeHandles();
  var p = this.position;

  // diff x
  var dx = 0;
  if( (p == an.k.NW) || (p == an.k.SW) || (p == an.k.W) ) {
    dx = position.x - handles.x[p];
  }
  if(handles.x[an.k.NE] == handles.x[an.k.NW]) {
    dx = 0;
  }

  // diff y
  var dy = 0;
  if( (p == an.k.NW) || (p == an.k.NE) || (p == an.k.N) ) {
    dy = position.y - handles.y[p];
  }
  if(handles.y[an.k.SW] == handles.y[an.k.NW]) {
    dy = 0;
  }

  var w;
  if( (p == an.k.NW) || (p == an.k.SW) || (p == an.k.W) ) {
    w = handles.x[an.k.NE] - position.x;
  } else if( (p == an.k.NE) || (p == an.k.E) || (p == an.k.SE) ) {
    w = position.x - handles.x[an.k.NW];
  } else {
    w = handles.x[an.k.NE] - handles.x[an.k.NW];
  }
  if(w <= 0) {
    w = 1;
  }

  var scaleX = w / (handles.x[an.k.NE] - handles.x[an.k.NW]);
  if(handles.x[an.k.NE] == handles.x[an.k.NW]) {
    scaleX = 0;
  }

  var h;
  if( (p == an.k.NW) || (p == an.k.N) || (p == an.k.NE) ) {
    h = handles.y[an.k.SW] - position.y;
  } else if( (p == an.k.SW) || (p == an.k.S) || (p == an.k.SE) ) {
    h = position.y - handles.y[an.k.NW];
  } else {
    h = handles.y[an.k.SW] - handles.y[an.k.NW];
  }
  if(h <= 0) {
    h = 1;
  }

  var scaleY = h / (handles.y[an.k.SW] - handles.y[an.k.NW]);;
  if(handles.y[an.k.SW] == handles.y[an.k.NW]) {
    scaleY = 0;
  }

  var fromX = handles.x[an.k.NW];
  var fromY = handles.y[an.k.NW];

  an.g.editor.resizeSelectedPaths(fromX, fromY, scaleX, scaleY);
  an.g.editor.translateSelectedPaths(dx, dy);

  an.g.editor.draw();

  // console.log(dx, dy);
};

} // block
