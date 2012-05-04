new function() {  // block

var self = Anima.Editor;

///////////////////////////////////////

self.prototype.deleteAll = function() {
  this._deleteAll();
}

self.prototype.delete = function() {
  this._deleteSelected();
}

self.prototype.cut = function() {
  this._cut();
}

self.prototype.copy = function() {
  this._copy();
}

self.prototype.paste = function() {
  this._paste();
}

///////////////////////////////////////

// repaint the screen
self.prototype.draw = function() {
  this._draw();
}

///////////////////////////////////////

// returns hit path or null
self.prototype.hitTest = function(x, y) {
  return this._onPath(x, y);
}

// check a hit on a control point or an anchor point
// return hit edge or null
self.prototype.isOnHandle = function(x, y) {
  return this._isOnHandle(x, y);
}

// return hit edge or null
self.prototype.isOnAnchorPoints = function(x, y) {
  return this._isOnAnchorPoints(x, y);
}

// return hit edge or null
self.prototype.hitTestResizeGuide = function(x, y) {
  return this._hitTestResizeGuide(x, y);
}

// return hit edge or null
self.prototype.hitTestRotateGuide = function(x, y) {
  return this._hitTestRotateGuide(x, y);
}

///////////////////////////////////////

self.prototype.setTimeFrame = function(frame) {
  this._setTimeFrame(frame);
}

self.prototype.setTrack = function(track) {
  this._setTrack(track);
}

///////////////////////////////////////

self.prototype.modifyPoint = function(edge, x, y) {
  this._modifyPoint(edge, x, y);
}

self.prototype.removePoint = function(edge) {
  this._removePoint(edge);
}

///////////////////////////////////////

self.prototype.setLineWidth = function(w) {
  this._setLineWidth(w);
}

self.prototype.translateSelectedPaths = function(x, y) {
  this._translateSelectedPaths(x, y);
}

// fix position
self.prototype.commitTranslation = function() {
//  this._commitTranslation();
}

self.prototype.resizeSelectedPaths = function(fromX, fromY, scaleX, scaleY) {
  this._resizeSelectedPaths(fromX, fromY, scaleX, scaleY);
}

// fix size
self.prototype.commitSize = function() {
//  this._commitSize();
}

self.prototype.rotateSelectedPaths = function() {
  this._rotateSelectedPaths();
}

// fix angle
self.prototype.commitRotation = function() {
//  this._commitRotation();
}

///////////////////////////////////////

self.prototype.addPath = function(p) {
  this._addPath(p);
}

self.prototype.getNewPath = function(p) {
  return this._getNewPath(p);
}

self.prototype.setNewPath = function(p) {
  this._setNewPath(p);
}

self.prototype.removePath = function(p) {
  this._removePath(p);
}

///////////////////////////////////////

self.prototype.setSelectMode = function(mode) {
  this._setSelectMode(mode);
}

self.prototype.getSelectedPaths = function() {
  return this._getSelectedPaths();
}

self.prototype.isSelectedPath = function(p) {
  return this._isSelectedPath(p);
}

self.prototype.selectPath = function(p) {
  this._selectPath(p);
}

self.prototype.deselectPath = function(p) {
  this._deselectPath(p);
}

self.prototype.deselectAll = function() {
  this._deselectAll();
}

self.prototype.selectAll = function() {
  this._selectAll();
}

///////////////////////////////////////

self.prototype.getResizeGuideHandles = function() {
  return this._getResizeGuideHandles();
}

self.prototype.getRotateGuideHandles = function() {
  return this._getRotateGuideHandles();
}

self.prototype.getBoundaryOfSelectedPaths = function() {
  return this._getBoundaryOfSelectedPaths();
}

///////////////////////////////////////

} // block

