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

self.prototype.removePoint = function(curve, point) {

  curve.removePoint(point);

}

self.prototype.subdivideSelectedPaths = function() {

  var plist = this.getSelectedPaths();

  plist.forEach(function(p) {

    p.subdivide();

  });

}

self.prototype.divideCurve = function(curve) {

  curve.subdivide();

}

} // block

