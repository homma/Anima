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

self.prototype.translateSelectedPaths = function(x, y) {
  editor.translateSelectedPaths(x, y);
}

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
 * @description divide path
 */
self.prototype.dividePath = function(path, curve, point) {
  editor.dividePath(path, curve, point);
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

self.prototype.getResizeArea = function() {

  return editor.getResizeArea();

}

///////////////////////////////////////

self.prototype.initialize = function() {

  editor.initialize();

}

} // block

