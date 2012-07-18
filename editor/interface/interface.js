new function() {  // block

var editor;  // editor internal

an.EditorInterface = function(ed) {

  editor = ed;

  this.EditorModes = ed.EditorModes;
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
// hit test

/**
 * @description test the coordinate is on a curve or not
 * @param {Number} x x-coordinate
 * @param {Number} y y-coordinate
 * @returns {Curve|null} a curve when hit
 */
self.prototype.isOnCurve = function(x, y) {
  return editor.onCurve(x, y);
}

/**
 * @description test (x, y) is on path
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 * @returns {Path|null} hit path or null
 */
self.prototype.isOnPath = function(x, y) {
  return editor.onPath(x, y);
}

/**
 * @description check hitting on control points or anchor points
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 * @returns varies by the mode
 *   { {path, curve, position} | null } hit info or null
 */
self.prototype.isOnHandle = function(x, y) {
  return editor.isOnHandle(x, y);
}

/**
 * @description check hitting on a anchor points
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 * @returns { {path, curve, position} | null } hit info or null
 */
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

/**
 * @param {Curve} a curve to modify
 * @param {Number} point in the curve to modify
 * @param {Number} x-coordinate to set
 * @param {Number} y-coordinate to set
 */
self.prototype.modifyPoint = function(curve, point, x, y) {
  editor.modifyPoint(curve, point, x, y);
}

/**
 * @description remove a point from a path
 * @param {Curve} a curve from which a point is removed
 * @param {Number} point in the curve to remove
 */
self.prototype.removePoint = function(curve, point) {
  editor.removePoint(curve, point);
}

///////////////////////////////////////

self.prototype.setLineWidth = function(w) {
  editor.setLineWidth(w);
}

///////////////////////////////////////
// transform

/**
 * @description translate selected paths
 * @param {Number} x x coordinate to move
 * @param {Number} y y coordinate to move
 */
self.prototype.translateSelectedPaths = function(x, y) {
  editor.translateSelectedPaths(x, y);
}

/**
 * @description resize selected paths
 */
self.prototype.resizeSelectedPaths = function(fromX, fromY, scaleX, scaleY) {
  editor.resizeSelectedPaths(fromX, fromY, scaleX, scaleY);
}

/**
 * @description scale selected paths
 * not yet implemented
 * @param {Number} x scaling factor of width
 * @param {Number} y scaling factor of height
 */
self.prototype.scaleSelectedPaths = function(x, y) {
  editor.scaleSelectedPaths(x, y);
}

/**
 * @description rotate selected paths
 */
self.prototype.rotateSelectedPaths = function(x, y, r) {
  editor.rotateSelectedPaths(x, y, r);
}

///////////////////////////////////////
// modify

/**
 * @description connect paths
 * @param {Path} from source path (moving)
 * @param {Boolean} head connect head (of source path to target path)
 * @param {Path} to target path (not moving, fixed position)
 * @param {Boolean} toHead connect to head or not
 * @returns {} 
 */
self.prototype.connectPaths = function(from, head, to, toHead) {
  editor.connectPath(from, head, to, toHead);
}

/**
 * @description split a path at a point
 */
self.prototype.splitPath = function(path, curve, point) {
  editor.splitPath(path, curve, point);
}

/**
 * @subdivide each curves in selected paths
 */
self.prototype.subdivideSelectedPaths = function() {
  editor.subdivideSelectedPaths();
}

/**
 * @description split a curve
 */
self.prototype.divideCurve = function(curve) {
  editor.divideCurve(curve);
}

///////////////////////////////////////
// commit for undo / redo

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
// shape

self.prototype.setShape = function(s) {
  editor.setShape(s);
}

/**
 * @description create a shape
 * @param {Number} x x coordinate of left top corner of new shape
 * @param {Number} y y coordinate of left top corner of new shape
 * @param {Number} w width of new shape
 * @param {Number} h height of new shape
 */
self.prototype.createShape = function(x, y, w, h) {
  editor.createShape(x, y, w, h);
}

self.prototype.drawShape = function(x, y, w, h) {
  editor.drawShape(x, y, w, h);
}

///////////////////////////////////////
// path selection

self.prototype.setEditorMode = function(mode) {
  editor.setEditorMode(mode);
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
// get handles

self.prototype.getResizeHandles = function() {

  return editor.getResizeHandles();

}

self.prototype.getRotateHandles = function() {

  return editor.getRotateHandles();

}

///////////////////////////////////////
// reset, initialize

self.prototype.initialize = function() {

  editor.initialize();

}

self.prototype.resetRotation = function() {

  editor.resetRotation();

}

} // block

