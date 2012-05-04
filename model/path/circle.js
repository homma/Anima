/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Path;

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

// ap => anchor point or end point
// cp => control point
self.prototype.addArc = function(ap0x, ap0y, cp0x, cp0y,
                                 ap1x, ap1y, cp1x, cp1y) {

  var edge = new Anima.Curve(ap0x, ap0y, cp0x, cp0y, ap1x, ap1y, cp1x, cp1y);
  this.addEdge(edge);

}

}  // block

