new function() {  // block

var editor;  // editor internal

an.EditorInterface = function(ed) {

  editor = ed;

  this.SelectModes = ed.SelectModes;
  an.g.editor = this;

}
var self = an.EditorInterface;

///////////////////////////////////////

self.prototype.deleteAll = function() {
  editor.deleteAll();
}

self.prototype.delete = function() {
  editor.deleteSelected();
}

self.prototype.cut = function() {
  editor.cut();
}

self.prototype.copy = function() {
  editor.copy();
}

self.prototype.paste = function() {
  editor.paste();
}

///////////////////////////////////////

// repaint the screen
self.prototype.draw = function() {
  editor.draw();
}

///////////////////////////////////////

// returns hit path or null
self.prototype.hitTest = function(x, y) {
  return editor.onPath(x, y);
}

// check a hit on a control point or an anchor point
// return hit edge or null
self.prototype.isOnHandle = function(x, y) {
  return editor.isOnHandle(x, y);
}

// return hit edge or null
self.prototype.isOnAnchorPoints = function(x, y) {
  return editor.isOnAnchorPoints(x, y);
}

///////////////////////////////////////

self.prototype.setTimeFrame = function(frame) {
  editor.setTimeFrame(frame);
}

self.prototype.setTrack = function(track) {
  editor.setTrack(track);
}

///////////////////////////////////////

self.prototype.modifyPoint = function(edge, x, y) {
  editor.modifyPoint(edge, x, y);
}

self.prototype.removePoint = function(edge) {
  editor.removePoint(edge);
}

///////////////////////////////////////

self.prototype.setLineWidth = function(w) {
  editor.setLineWidth(w);
}

self.prototype.translateSelectedPaths = function(x, y) {
  editor.translateSelectedPaths(x, y);
}

// connect paths
//   from: from path,  // source path (moving)
//   head: boolean,    // connect head (of source path to target path)
//     to: to path,    // target path (not moving, fixed position)
// toHead: boolean     // connect to head or not
self.prototype.connectPaths = function(from, head, to, toHead) {
  editor.connectPath(from, head, to, toHead);
}

self.prototype.resizeSelectedPaths = function(fromX, fromY, scaleX, scaleY) {
  editor.resizeSelectedPaths(fromX, fromY, scaleX, scaleY);
}

self.prototype.rotateSelectedPaths = function() {
  editor.rotateSelectedPaths();
}

self.prototype.commitChanges = function() {
  // editor.commitChanges();
}

// can be replaced with commitChanges() ?
// fix position
self.prototype.commitTranslation = function() {
  editor.commitTranslation();
}

// can be replaced with commitChanges() ?
// fix size
self.prototype.commitSize = function() {
//  editor.commitSize();
}

// can be replaced with commitChanges() ?
// fix angle
self.prototype.commitRotation = function() {
//  editor.commitRotation();
}

///////////////////////////////////////
// path arrangement

self.prototype.addPath = function(p) {
  editor.addPath(p);
}

self.prototype.getNewPath = function(p) {
  return editor.getNewPath(p);
}

self.prototype.setNewPath = function(p) {
  editor.setNewPath(p);
}

self.prototype.removePath = function(p) {
  editor.removePath(p);
}

///////////////////////////////////////
// path selection

self.prototype.setSelectMode = function(mode) {
  editor.setSelectMode(mode);
}

self.prototype.getSelectedPaths = function() {
  return editor.getSelectedPaths();
}

self.prototype.isSelectedPath = function(p) {
  return editor.isSelectedPath(p);
}

self.prototype.selectPath = function(p) {
  editor.selectPath(p);
}

self.prototype.deselectPath = function(p) {
  editor.deselectPath(p);
}

self.prototype.deselectAll = function() {
  editor.deselectAll();
}

self.prototype.selectAll = function() {
  editor.selectAll();
}

///////////////////////////////////////

self.prototype.getResizeArea = function() {

  return editor.getResizeArea();

}

///////////////////////////////////////

self.prototype.initialize = function() {

  editor.initialize();

}

} // block

