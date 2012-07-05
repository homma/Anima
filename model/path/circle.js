/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Path;

self.prototype.createCircle = function(x, y, r) {

  if(this.edges.length != 0) { return null; }

  var k = 0.5522847;  // constant for bezier approximation

  var len = r * k;

  this.addArc(x + r, y,
              x + r, y + len,
              x, y + r,
              x + len, y + r);

  this.addArc(x, y + r,
              x - len, y + r,
              x - r, y,
              x - r, y + len);

  this.addArc(x - r, y,
              x - r, y - len,
              x, y - r,
              x - len, y - r);

  this.addArc(x, y - r,
              x + len, y - r,
              x + r, y,
              x + r, y - len);

  this.finished();

}

// p => anchor point
// c => control point
self.prototype.addArc = function(p0x, p0y, c0x, c0y, p1x, p1y, c1x, c1y) {

  var edge = new an.Curve(p0x, p0y, c0x, c0y, p1x, p1y, c1x, c1y);
  this.addEdge(edge);

}

}  // block

