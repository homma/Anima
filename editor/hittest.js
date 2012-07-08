/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// hittest ////////////////////////////////////////////////////////////////////

// returns a path if hit
self.prototype.onPath = function(x, y) {

  var path = null;
  var ctx = this.canvas.canvas.getContext('2d');

  for(var i = 0; i < this.pathList.length; i++) {
    if( this.pathList[i].onPath(ctx, x, y) ) {
      path = this.pathList[i];
      break;
    }
  }

  return path;

}

// not used now
self.prototype.inPath = function(x, y) {

  var path = null;

  path = this.onPath(x, y);
  if( path ) { return path; };

/*
  var ctx = this.canvas.canvas.getContext('2d');

  for(var i = 0; i < this.pathList.length; i++) {
    if( this.pathList[i].isPointInPath(ctx, x, y) ) {
      path = this.pathList[i];
      break;
    }
  }
*/

  return path;

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

