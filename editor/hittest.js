/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// hittest ////////////////////////////////////////////////////////////////////

/**
 * @description test the coordinate is on a curve or not
 * @param {Number} x x-coordinate
 * @param {Number} y y-coordinate
 * @returns {Curve|null} a curve when hit
 */
self.prototype.onCurve = function(x, y) {

  var ret = null;
  var ctx = this.canvas.canvas.getContext('2d');

  for(var i = 0; i < this.pathList.length; i++) {

    ret = this.pathList[i].onCurve(ctx, x, y);
    if( ret ) {
      break;
    }

  }

  return ret;

}

/**
 * @description test the coordinate is on a path
 * @param {Number} x x-coordinate
 * @param {Number} y y-coordinate
 * @returns {Path|null} path if hit
 */
self.prototype.onPath = function(x, y) {

  var ret = null;
  var ctx = this.canvas.canvas.getContext('2d');

  for(var i = 0; i < this.pathList.length; i++) {

    ret = this.pathList[i].onPath(ctx, x, y);
    if( ret ) {
      break;
    }

  }

  return ret;

}

// not used now
self.prototype.inPath = function(x, y) {

  return this.onPath(x, y);

}

/**
 * @description returns hit information
 * @returns { {path, curve, position} | null }
 */
self.prototype.isOnAnchorPoints = function(x, y) {

  return this.editorMode.isOnAnchorPoints(x, y);

}

/**
 * @description returns hit info for curve handles
 * @returns varies by the mode
 *  { {path, curve, position} | null }
 */
self.prototype.isOnHandle = function(x, y) {

  return this.editorMode.isOnHandle(x, y);

}

} // block

