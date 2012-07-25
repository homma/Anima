/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// translate(move) ////////////////////////////////////////////////////////////

self.prototype.translateSelectedPaths = function(x, y) {

  this.selectedPathList.forEach( function(v) {
    this.translatePath(v, x, y);
  }, this);

}

self.prototype.translatePath = function(p, x, y) {

  p.translate(x, y);

}

/// resize /////////////////////////////////////////////////////////////////////

/**
 * @description resize selected paths
 * @param {Path} p a path to resize
 * @param {Number} fx x coordinate of the origin of scale
 * @param {Number} fy y coordinate of the origin of scale
 * @param {Number} sx horisontal scale factor
 * @param {Number} sy vertical scale factor
 */
self.prototype.resizePath = function(p, fx, fy, sx, sy) {

  p.resize(fx, fy, sx, sy);

}

/// rotate /////////////////////////////////////////////////////////////////////

/**
 * @description rotate selected paths
 * @param {Number} x x coordinate of the center of the rotation
 * @param {Number} y y coordinate of the center of the rotation
 * @param {Number} r angle of the rotation (radian)
 */
self.prototype.rotateSelectedPaths = function(x, y, r) {

  // guard
  if(this.editorMode != this.EditorModes.rotate) { return null; }

  var angle = this.editorMode.getRotateAngle();
  this.editorMode.setRotateAngle(r + angle);

  this.selectedPathList.forEach( function(v) {
    this.rotatePath(v, x, y, r);
  }, this);

}

/**
 * @description rotate a path
 * @param {Path} p a path to rotate
 * @param {Number} x x coordinate of the center of the rotation
 * @param {Number} y y coordinate of the center of the rotation
 * @param {Number} r angle of the rotation (radian)
 */
self.prototype.rotatePath = function(p, x, y, r) {

  p.rotate(x, y, r);

}

/// connect ////////////////////////////////////////////////////////////////////

/**
 * @description check possibility of path connection and connect paths
 */
self.prototype.connectPathIfPossible = function() {
  this.editorMode.connectPathIfPossible();
}

/**
 * @description connect two path
 * @param {Path} from source path (moving)
 * @param {Boolean} head connect head (of source path to target path)
 * @param {Path} to target path (not moving, fixed position)
 * @param {Boolean} toHead connect to head or not
 * @returns {}
 */
self.prototype.connectPaths = function(from, head, to, toHead) {

  if(!head) from.reverse();
  if(toHead) to.reverse();

  to.append(from);
  this.removePath(from);

}

/// split //////////////////////////////////////////////////////////////////////

/**
 * @description split a path
 * @param {Path} path a path to split
 * @param {Curve} curve a curve includes splitting point
 * @param {Number} point a position in the curve to split
 */
self.prototype.splitPath = function(path, curve, point) {

  return path.splitPath(curve, point);

}

} // block

