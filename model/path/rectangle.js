/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Path;

self.prototype.createRectangle = function(x, y, w, h) {
  // x and y: left-top corner

  this.addLine(x, y, x + w, y);
  this.addLine(x + w, y, x + w, y - h);
  this.addLine(x + w, y - h, x, y - h);
  this.addLine(x, y - h, x, y);

  this.finished();

}

self.prototype.addLine = function(p0x, p0y, p1x, p1y) {

  var edge = new an.Curve(p0x, p0y, p0x, p0y, p1x, p1y, p1x, p1y);
  this.addEdge(edge);

}

}  // block

