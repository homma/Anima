/*
 * @author Daisuke Homma
 */

new function() {  // block

/// info ///////////////////////////////////////////////////////////////////////

var self = an.Path;

self.prototype.getBoundary = function() {

  var rect = this.edges[0].getBoundary();

  for (var i = 1; this.edges.length > i; i++) {
    var bound = this.edges[i].getBoundary();
    rect = an.u.getCompoundBoundary(bound, rect);
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

self.prototype.addLine = function(p0x, p0y, p1x, p1y) {

//  console.log(" p0x: " + p0x + " p0y: " + p0y);
//  console.log(" p1x: " + p1x + " p1y: " + p1y);

  var edge = new an.Curve(p0x, p0y, p0x, p0y, p1x, p1y, p1x, p1y);
  this.addEdge(edge);

}

// p => anchor point
// c => control point
self.prototype.addArc = function(p0x, p0y, c0x, c0y, c1x, c1y, p1x, p1y) {

  var edge = new an.Curve(p0x, p0y, c0x, c0y, c1x, c1y, p1x, p1y);
  this.addEdge(edge);

}

} // block

