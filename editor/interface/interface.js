new function() {  // block

var editor;  // editor internal

an.EditorInterface = function(ed) {

  editor = ed;

  this.EditorModes = ed.EditorModes;
  an.g.editor = this;

}
var self = an.EditorInterface;

///////////////////////////////////////
// copy / paste / cut / delete

/**
 * @needUndo
 * @description remove all paths
 */
self.prototype.deleteAll = function() {

  // undo
  var old = editor.getAllPaths();
  old.forEach(function(v) {
    an.g.undoManager.registerUndo(this, this.addPath, [v]);
  }, this);

  editor.deleteAll();

}

/**
 * @needUndo
 * @description remove selected paths
 */
self.prototype.deleteSelected = function() {

  // undo
  var old = editor.getSelectedPaths();
  old.forEach(function(v) {
    an.g.undoManager.registerUndo(this, this.addPath, [v]);
  }, this);

  editor.deleteSelected();

}

/**
 * @needUndo
 * @description copy and delete selected paths
 */
self.prototype.cut = function() {

  // undo
  var old = editor.getSelectedPaths();
  old.forEach(function(v) {
    an.g.undoManager.registerUndo(this, this.addPath, [v]);
  }, this);

  editor.cut();

}

self.prototype.copy = function() {

  editor.copy();

}

/**
 * @needUndo
 * @description paste paths form clip board
 */
self.prototype.paste = function() {

  editor.paste();

  // undo
  var old = editor.getSelectedPaths();
  old.forEach(function(v) {
    an.g.undoManager.registerUndo(this, this.removePath, [v]);
  }, this);

}

///////////////////////////////////////
// drawing path data

// repaint every path on the screen
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
// animation related

/** @needUndo */
self.prototype.setTimeFrame = function(frame) {

  // undo
  var old = editor.getTimeFrame();
  an.g.undoManager.registerUndo(this, this.setTimeFrame, [old]);

  editor.setTimeFrame(frame);

}

/** @needUndo */
self.prototype.setTrack = function(track) {

  // undo
  var old = editor.getTrack();
  an.g.undoManager.registerUndo(this, this.setTrack, [old]);

  editor.setTrack(track);

}

///////////////////////////////////////
// operating points

/**
 * @needUndo
 * @description move a point in a curve
 * @param {Curve} a curve to modify
 * @param {Number} point in the curve to modify
 * @param {Number} x-coordinate to set
 * @param {Number} y-coordinate to set
 */
self.prototype.modifyPoint = function(curve, point, x, y) {

  // undo
  var old = editor.getPoint(curve, point);
  an.g.undoManager.registerUndo(this, this.modifyPoint,
                                [curve, point, old.x, old.y]);

  editor.modifyPoint(curve, point, x, y);

}

/**
 * @needUndo
 * @description remove a point from a path
 * @param {Curve} a curve from which a point is removed
 * @param {Number} point in the curve to remove
 */
self.prototype.removePoint = function(curve, point) {

  // undo
  // to be implemented

  editor.removePoint(curve, point);

}

///////////////////////////////////////
// modifying lines

/**
 * @needUndo
 * @description set line width of a path
 * @param {Path} p a path to set line width
 * @param {Number} w width to set
 */
self.prototype.setLineWidthOfPath = function(p, w) {

  // undo
  var width = p.getLineWidth();
  an.g.undoManager.registerUndo(this, this.setLineWidthOfPath, [p, width]);

  editor.setLineWidthOfPath(p, w);

}

///////////////////////////////////////
// transform paths

/**
 * @description translate selected paths
 * @param {Number} x x coordinate to move
 * @param {Number} y y coordinate to move
 */
self.prototype.translateSelectedPaths = function(x, y) {

  var lst = editor.getSelectedPaths();
  lst.forEach(function(v) {
    this.translatePath(v, x, y);
  }, this);

}

/**
 * @needUndo
 * @description translate a path
 * @param {Path} p a path to translate
 * @param {Number} x x coordinate to move
 * @param {Number} y y coordinate to move
 */
self.prototype.translatePath = function(p, x, y) {

  // undo
  an.g.undoManager.registerUndo(this, this.translatePath, [p, -x, -y]);

  editor.translatePath(p, x, y);

}

/**
 * @needUndo
 * @description resize selected paths
 * @param {Number} fromX x coordinate of the origin of scale
 * @param {Number} fromY y coordinate of the origin of scale
 * @param {Number} scaleX horisontal scale factor
 * @param {Number} scaleY vertical scale factor
 */
self.prototype.resizeSelectedPaths = function(fromX, fromY, scaleX, scaleY) {

  var lst = editor.getSelectedPaths();
  lst.forEach(function(v) {
    this.resizePath(v, fromX, fromY, scaleX, scaleY);
  }, this);

}

/**
 * @description resize selected paths
 * @param {Path} p a path to resize
 * @param {Number} fx x coordinate of the origin of scale
 * @param {Number} fy y coordinate of the origin of scale
 * @param {Number} sx horisontal scale factor
 * @param {Number} sy vertical scale factor
 */
self.prototype.resizePath = function(p, fx, fy, sx, sy) {

  // undo
  an.g.undoManager.registerUndo(this, this.resizePath, [p, fx, fy, 1/sx, 1/sy]);

  editor.resizePath(p, fx, fy, sx, sy);

}

/**
 * @needUndo
 * @description rotate selected paths
 */
self.prototype.rotateSelectedPaths = function(x, y, r) {

  editor.rotateSelectedPaths(x, y, r);
}

self.prototype.setRotation = function(r) {

  // to be implemented

}

/**
 * @description reset rotator's internal state
 */
self.prototype.resetRotation = function() {

  editor.resetRotation();

}

///////////////////////////////////////
// modify

/**
 * @description check possibility of path connection and connect paths
 */
self.prototype.connectPathIfPossible = function() {
  editor.connectPathIfPossible();
}

/**
 * @needUndo
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
 * @needUndo
 * @description split a path at a point
 */
self.prototype.splitPath = function(path, curve, point) {
  editor.splitPath(path, curve, point);
}

/**
 * @needUndo
 * @subdivide each curves in selected paths
 */
self.prototype.subdivideSelectedPaths = function() {
  editor.subdivideSelectedPaths();
}

/**
 * @needUndo
 * @description split a curve
 */
self.prototype.divideCurve = function(curve) {
  editor.divideCurve(curve);
}

///////////////////////////////////////
// commit for undo / redo

/**
 * @description commit the past changes. makes a undo point.
 */
self.prototype.commit = function() {

  editor.commit();

}

///////////////////////////////////////
// path arrangement

/**
 * @needUndo
 * @description add a path to path list
 */
self.prototype.addPath = function(p) {

  an.g.undoManager.registerUndo(this, this.removePath, [p]);

  editor.addPath(p);

}

/**
 * @description get current new path
 */
self.prototype.getNewPath = function(p) {
  return editor.getNewPath(p);
}

/**
 * @needUndo
 * @description get current new path
 */
self.prototype.setNewPath = function(p) {

  // undo
  var old = editor.getNewPath();
  an.g.undoManager.registerUndo(this, this.setNewPath, [old]);

  editor.setNewPath(p);

}

/** @needUndo */
self.prototype.removePath = function(p) {

  an.g.undoManager.registerUndo(this, this.addPath, [p]);

  editor.removePath(p);

}

///////////////////////////////////////
// shape

/**
 * @needUndo
 * @description select a shape which is used in shape creator mode
 */
self.prototype.setShape = function(s) {

  // undo
  var old = editor.getShape();
  an.g.undoManager.registerUndo(this, this.setShape, [old]);

  editor.setShape(s);

}

/**
 * @needUndo
 * @description create a shape
 * @param {Number} x x coordinate of left top corner of new shape
 * @param {Number} y y coordinate of left top corner of new shape
 * @param {Number} w width of new shape
 * @param {Number} h height of new shape
 */
self.prototype.createShape = function(x, y, w, h) {

  var p = editor.createShape(x, y, w, h);

  an.g.undoManager.registerUndo(this, this.removePath, [p]);

}

self.prototype.drawShape = function(x, y, w, h) {
  editor.drawShape(x, y, w, h);
}

///////////////////////////////////////
// path selection

/** @needUndo */
self.prototype.setEditorMode = function(mode) {

  // undo
  var old = editor.getEditorMode();
  an.g.undoManager.registerUndo(this, this.setEditorMode, [old]);

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

} // block

