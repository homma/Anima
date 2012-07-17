/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// change attribute ///////////////////////////////////////////////////////////

self.prototype.setLineWidth = function(w) {
  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.pathList[i].setLineWidth(w);
  }
}

/// translate(move) ////////////////////////////////////////////////////////////

self.prototype.translateSelectedPaths = function(x, y) {

  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.selectedPathList[i].translate(x, y);
  }

}

self.prototype.commitTranslation = function() {
  this.editorMode.commitTranslation();
}

/// connect ////////////////////////////////////////////////////////////////////

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

  path.splitPath(curve, point);

}

/// resize /////////////////////////////////////////////////////////////////////

self.prototype.resizeSelectedPaths = function(fromX, fromY, scaleX, scaleY) {

  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.selectedPathList[i].resize(fromX, fromY, scaleX, scaleY);
  }

}

/**
 * @description scale selected paths
 * not yet implemented
 * @param {Number} x scaling factor of width
 * @param {Number} y scaling factor of height
 */
self.prototype.scaleSelectedPaths = function(x, y) {

  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.selectedPathList[i].scale(x, y);
  }

}

self.prototype.commitSize = function() {
  // do something
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

  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.selectedPathList[i].rotate(x, y, r);
  }
}

self.prototype.commitRotation = function() {
  // do something
}

} // block

