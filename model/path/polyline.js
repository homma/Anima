/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Path;

self.prototype.createPolyLine = function(poly) {

  var self = this;
  poly.forEach( function(v, i) {

    var next = i + 1;
    if( i == poly.length - 1) { next = 0 };

    self.addLine(v.x, v.y, poly[next].x, poly[next].y);

  });

  this.finished();

}

self.prototype.addLine = function(p0x, p0y, p1x, p1y) {

  var edge = new Anima.Curve(p0x, p0y, p0x, p0y, p1x, p1y, p1x, p1y);
  this.addEdge(edge);

}

}  // block

