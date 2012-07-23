/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// transform //////////////////////////////////////////////////////////////////

/**
 * @description change position of the point in the curve
 * @param {Curve} a curve to modify
 * @param {Number} point in the curve to modify
 * @param {Number} x-coordinate to set
 * @param {Number} y-coordinate to set
 */
self.prototype.modifyPoint = function(curve, point, x, y) {

  if(this.editorMode == this.EditorModes.connect) {
    // connect curve

  }
  curve.setPoint(point, x, y);

}

/**
 * @description get a coordination of a point
 * @returns { x: {Number}, y: {Number} } a coordination
 */
self.prototype.getPoint = function(curve, point) {

  return curve.getPoint(point);

}

/**
 * @description remove a point from a curve
 * @param {Curve} curve a curve from which a point will be removed
 * @param {Number} point a position of the point to be removed
 */
self.prototype.removePoint = function(curve, point) {

  curve.removePoint(point);

}

/**
 * @description subdivide a path
 * @param {Path} path a path to be subdivided
 */
self.prototype.subdividePath = function(path) {

  path.subdivide();

}

self.prototype.divideCurve = function(curve) {

  curve.subdivide();

}

} // block

