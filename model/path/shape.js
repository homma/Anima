/*
 * @fileOverview shapes
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Path;

/**
 * @description create a rectangle
 * @param {Number} x x coordinate of left top corner of new rectangle
 * @param {Number} y y coordinate of left top corner of new rectangle
 * @param {Number} w width of new rectangle
 * @param {Number} h height of new rectangle
 */
self.prototype.createRectangle = function(x, y, w, h) {

  // console.log(" x: " + x + " y: " + y + " w: " + w + " h: " + h);

  this.addLine(x, y, x + w, y);
  this.addLine(x + w, y, x + w, y + h);
  this.addLine(x + w, y + h, x, y + h);
  this.addLine(x, y + h, x, y);

  this.finished();

}

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

}  // block

