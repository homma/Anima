/*
 * @author Daisuke Homma
 */

new function() {  // block

/// info ///////////////////////////////////////////////////////////////////////

var self = Anima.Path;

self.prototype.getBoundary = function() {

  var rect = this.edges[0].getBoundary();

  for (var i = 1; this.edges.length > i; i++) {
    var bound = this.edges[i].getBoundary();
    rect = Anima.Util.getCompoundBoundary(bound, rect);
  }

/*  this has a conflict with resizing...

  // adjust the size for current line width
  var adjust = this.lineWidth / 2;
  rect.x -= adjust;
  rect.y -= adjust;
  rect.w += this.lineWidth;
  rect.h += this.lineWidth;
*/

  return rect;

}

} // block

