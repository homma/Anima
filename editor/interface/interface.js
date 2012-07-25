/**
 * @fileOverview editor interface, undo / redo interface
 *   every update to the model must go through this interface
 * @author Daisuke Homma
 */

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
 * @returns { {path, curve} | null } hit info or null
 */
self.prototype.isOnCurve = function(x, y) {
  return editor.onCurve(x, y);
}

/**
 * @description test (x, y) is on path
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 * @returns { {path, curve} | {path} | null } hit info or null
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

/**
 * @needUndo
 * @description set time frame (or surface) to edit
 */
self.prototype.setTimeFrame = function(frame) {

  // undo
  var old = editor.getTimeFrame();
  if(old != null) {
    an.g.undoManager.registerUndo(this, this.setTimeFrame, [old]);
  }

  editor.setTimeFrame(frame);

}

/**
 * @needUndo
 * @description set animation track (or layer) to edit
 */
self.prototype.setTrack = function(track) {

  // undo
  var old = editor.getTrack();
  if(old != null) {
    an.g.undoManager.registerUndo(this, this.setTrack, [old]);
  }

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
 * @param {Path} path a path which includes a curve of the point to be removed
 * @param {Curve} curve a curve from which a point is removed
 * @param {Number} point a point in the curve to be removed
 */
self.prototype.removePoint = function(path, curve, point) {

  // undo
  var p = path.duplicate();
  an.g.undoManager.registerUndo(this, this.unremovePoint,
                                [p, path, curve, point]);

  editor.removePoint(curve, point);

}

/**
 * @description an opposite operation to removePoint() for undo/redo
 */
self.prototype.unremovePoint = function(newPath, path, curve, point) {

  // undo
  an.g.undoManager.registerUndo(this, this.removePoint, [path, curve, point]);

  path.replaceWith(newPath);

}

///////////////////////////////////////
// modifying line attributes

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

/**
 * @needUndo
 * @description set line cap style of a path
 * @param {Path} p a path to set line cap style
 * @param {String} style a style to be set
 */
self.prototype.setLineCapOfPath = function(p, style) {

  // undo
  var old = editor.getLineCapOfPath(p);
  an.g.undoManager.registerUndo(this, this.setLineCapOfPath, [p, old]);

  editor.setLineCapOfPath(p, style);

}

/**
 * @needUndo
 * @description set line join style of a path
 * @param {Path} p a path to set join style
 * @param {String} style a style to be set
 */
self.prototype.setLineJoinOfPath = function(p, style) {

  // undo
  var old = editor.getLineJoinOfPath(p);
  an.g.undoManager.registerUndo(this, this.setLineJoinOfPath, [p, old]);

  editor.setLineJoinOfPath(p, style);

}

/**
 * @needUndo
 * @description set miter limit of a path
 * @param {Path} p a path to set miter limit
 * @param {Number} n a value of miter limit
 */
self.prototype.setMiterLimitOfPath = function(p, n) {

  // undo
  var old = editor.getMiterLimitOfPath(p);
  an.g.undoManager.registerUndo(this, this.setMiterLimitOfPath, [p, old]);

  editor.setMiterLimitOfPath(p, n);

}

/**
 * @needUndo
 * @description set close path or not
 * @param {Path} p a path to set close path or not
 * @param {Boolean} f close or not
 */
self.prototype.setClosePath = function(p, f) {

  // undo
  var old = editor.getClosePath(p);
  an.g.undoManager.registerUndo(this, this.setClosePath, [p, old]);

  editor.setClosePath(p, f);

}

/**
 * @needUndo
 * @description let a path to stroke itself
 * @param {Path} p a path to set close path or not
 * @param {Boolean} f stroke or not
 */
self.prototype.setStroke = function(p, f) {

  // undo
  var old = editor.getStroke(p);
  an.g.undoManager.registerUndo(this, this.setStroke, [p, old]);

  editor.setStroke(p, f);

}

/**
 * @needUndo
 * @description let a path to fill itself
 * @param {Path} p a path to set close path or not
 * @param {Boolean} f fill or not
 */
self.prototype.setFill = function(p, f) {

  // undo
  var old = editor.getFill(p);
  an.g.undoManager.registerUndo(this, this.setFill, [p, old]);

  editor.setFill(p, f);

}

///////////////////////////////////////
// modifying color attributes
// stroke

/**
 * @needUndo
 * @description change hue to stroke a path
 * @param {Path} p a path to be changed
 * @param {Number} v a value of hue
 */
self.prototype.setStrokeHueOfPath = function(p, v) {

  // undo
  var old = editor.getStrokeHueOfPath(p);
  an.g.undoManager.registerUndo(this, this.setStrokeHueOfPath, [p, old]);

  editor.setStrokeHueOfPath(p, v);

}

/**
 * @needUndo
 * @description change saturation to stroke a path
 * @param {Path} p a path to be changed
 * @param {Number} v a value of saturation
 */
self.prototype.setStrokeSaturationOfPath = function(p, v) {

  // undo
  var old = editor.getStrokeSaturationOfPath(p);
  an.g.undoManager.registerUndo(this, this.setStrokeSaturationOfPath, [p, old]);

  editor.setStrokeSaturationOfPath(p, v);

}

/**
 * @needUndo
 * @description change luminance to stroke a path
 * @param {Path} p a path to be changed
 * @param {Number} v a value of luminance
 */
self.prototype.setStrokeLuminanceOfPath = function(p, v) {

  // undo
  var old = editor.getStrokeLuminanceOfPath(p);
  an.g.undoManager.registerUndo(this, this.setStrokeLuminanceOfPath, [p, old]);

  editor.setStrokeLuminanceOfPath(p, v);

}

/**
 * @needUndo
 * @description change alpha to stroke a path
 * @param {Path} p a path to be changed
 * @param {Number} v a value of alpha
 */
self.prototype.setStrokeAlphaOfPath = function(p, v) {

  // undo
  var old = editor.getStrokeAlphaOfPath(p);
  an.g.undoManager.registerUndo(this, this.setStrokeAlphaOfPath, [p, old]);

  editor.setStrokeAlphaOfPath(p, v);

}

///////////////////////////////////////
// modifying color attributes
// fill

/**
 * @needUndo
 * @description change hue to fill a path
 * @param {Path} p a path to be changed
 * @param {Number} v a value of hue
 */
self.prototype.setFillHueOfPath = function(p, v) {

  // undo
  var old = editor.getFillHueOfPath(p);
  an.g.undoManager.registerUndo(this, this.setFillHueOfPath, [p, old]);

  editor.setFillHueOfPath(p, v);

}

/**
 * @needUndo
 * @description change saturation to fill a path
 * @param {Path} p a path to be changed
 * @param {Number} v a value of saturation
 */
self.prototype.setFillSaturationOfPath = function(p, v) {

  // undo
  var old = editor.getFillSaturationOfPath(p);
  an.g.undoManager.registerUndo(this, this.setFillSaturationOfPath, [p, old]);

  editor.setFillSaturationOfPath(p, v);

}

/**
 * @needUndo
 * @description change luminance to fill a path
 * @param {Path} p a path to be changed
 * @param {Number} v a value of luminance
 */
self.prototype.setFillLuminanceOfPath = function(p, v) {

  // undo
  var old = editor.getFillLuminanceOfPath(p);
  an.g.undoManager.registerUndo(this, this.setFillLuminanceOfPath, [p, old]);

  editor.setFillLuminanceOfPath(p, v);

}

/**
 * @needUndo
 * @description change alpha to fill a path
 * @param {Path} p a path to be changed
 * @param {Number} v a value of alpha
 */
self.prototype.setFillAlphaOfPath = function(p, v) {

  // undo
  var old = editor.getFillAlphaOfPath(p);
  an.g.undoManager.registerUndo(this, this.setFillAlphaOfPath, [p, old]);

  editor.setFillAlphaOfPath(p, v);

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

/**
 * @needUndo
 * @description rotate a path
 */
self.prototype.setRotation = function(r) {

  // undo
  // to be implemented

  // to be implemented

}

/**
 * @description reset rotator's internal state
 */
self.prototype.resetRotation = function() {

  editor.resetRotation();

}

///////////////////////////////////////
// modify path

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

  // undo
  var p1 = to.duplicate();
  var p2 = from.duplicate();
  an.g.undoManager.registerUndo(this, this.unconnectPaths,
                                [p1, p2, from, head, to, toHead]);

  editor.connectPaths(from, head, to, toHead);

}

self.prototype.unconnectPaths = function(p1, p2, from, head, to, toHead) {

  to.replaceWith(p1);
  from.replaceWith(p2);
  editor.addPath(from);

  an.g.undoManager.registerUndo(this, this.connectPaths,
                                [from, head, to, toHead]);

}

/**
 * @needUndo
 * @description split a path at a point
 */
self.prototype.splitPath = function(path, curve, point) {

  // undo
  var p = path.duplicate();
  an.g.undoManager.registerUndo(this, this.unsplitPath,
                                [p, path, curve, point]);

  editor.splitPath(path, curve, point);

}

self.prototype.unsplitPath = function(oldPath, path, curve, point) {

  path.replaceWith(oldPath);

  // undo
  an.g.undoManager.registerUndo(this, this.splitPath, [path, curve, point]);

}

/**
 * @subdivide each curves in selected paths
 */
self.prototype.subdivideSelectedPaths = function() {

  var lst = editor.getSelectedPaths();
  lst.forEach(function(v) {
    this.subdividePath(v);
  }, this);

}

/**
 * @needUndo
 * @subdivide a curve
 * @param {Path} path a path to be subdivided
 */
self.prototype.subdividePath = function(path) {

  // undo
  var p = path.duplicate();
  an.g.undoManager.registerUndo(this, this.unsubdividePath, [p, path]);

  editor.subdividePath(path);

}

/**
 * @description an opposite operation to subdividePath() for undo/redo
 */
self.prototype.unsubdividePath = function(oldPath, path) {

  path.replaceWith(oldPath);

  // undo
  an.g.undoManager.registerUndo(this, this.subdividePath, [path]);

}

/**
 * @needUndo
 * @description split a curve
 * @param {Path} path a path which contains a curve to be divided
 * @param {Curve} curve a curve to be divided
 */
self.prototype.divideCurve = function(path, curve) {

  // undo
  var p = path.duplicate();
  an.g.undoManager.registerUndo(this, this.undivideCurve, [p, path, curve]);

  editor.divideCurve(curve);

}

/**
 * @description an opposite operation to removePoint() for undo/redo
 */
self.prototype.undivideCurve = function(newPath, path, curve) {

  // undo
  an.g.undoManager.registerUndo(this, this.divideCurve, [path, curve]);

  path.replaceWith(newPath);

}


///////////////////////////////////////
// commit for undo / redo

/**
 * @description commit the past changes. makes a undo point.
 */
self.prototype.commit = function() {

  an.g.undoManager.commit();

}

///////////////////////////////////////
// path arrangement

/**
 * @needUndo
 * @description add a path to path list
 */
self.prototype.addPath = function(p) {

  // undo
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
 * @description get current new path
 */
self.prototype.setNewPath = function(p) {

  editor.setNewPath(p);

}

/**
 * @needUndo
 * @description remove a path
 * @param {Path} p a path to be removed
 */
self.prototype.removePath = function(p) {

  // undo
  an.g.undoManager.registerUndo(this, this.addPath, [p]);

  editor.removePath(p);

}

///////////////////////////////////////
// shape

/**
 * @description select a shape which is used in shape creator mode
 */
self.prototype.setShape = function(s) {

  // we don't do undo here
  // var old = editor.getShape();
  // n.g.undoManager.registerUndo(this, this.setShape, [old]);

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

  // undo
  an.g.undoManager.registerUndo(this, this.removePath, [p]);

}

self.prototype.drawShape = function(x, y, w, h) {
  editor.drawShape(x, y, w, h);
}

///////////////////////////////////////
// path selection

self.prototype.setEditorMode = function(mode) {

  // we don't do undo here
  // var old = editor.getEditorMode();
  // an.g.undoManager.registerUndo(this, this.setEditorMode, [old]);

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

