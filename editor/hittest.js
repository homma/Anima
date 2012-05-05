/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// hittest ////////////////////////////////////////////////////////////////////

// returns a path if hit
// called from this.inPath()
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

// returns an edge if hit
self.prototype.isOnAnchorPoints = function(x, y) {

  // guard
  if(this.selectMode != this.SelectModes.transform) { return hitEdge; };

  return this.selectMode.isOnAnchorPoints(x, y);
}

// returns an edge if hit the modification handles
self.prototype.isOnHandle = function(x, y) {

  return this.selectMode.isOnHandle(x, y);

}

} // block

