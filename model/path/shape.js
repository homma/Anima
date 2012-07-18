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

self.prototype.createOval = function(x, y, w, h) {

  var r;

  var aw = Math.abs(w);
  var ah = Math.abs(h);

  if( aw < ah ) {

    r = h;
    this.createCircleImpl(x, y, r);
    this.resize(x, y, aw / ah, 1);

  } else {

    r = w;
    this.createCircleImpl(x, y, r);
    this.resize(x, y, 1, ah / aw);

  }


}

self.prototype.createCircle = function(x, y, w, h) {

  var r;

  if( w < h ) {
    r = w;
  } else {
    r = h;
  }

  this.createCircleImpl(x, y, r);

}

self.prototype.createCircleImpl = function(x, y, r) {


  if(this.edges.length != 0) { return null; }

  var k = 0.5522847;  // constant for bezier approximation

  var len = r * k;

  this.addArc(x + r, y,
              x + r, y + len,
              x + len, y + r,
              x, y + r);

  this.addArc(x, y + r,
              x - len, y + r,
              x - r, y + len,
              x - r, y);

  this.addArc(x - r, y,
              x - r, y - len,
              x - len, y - r,
              x, y - r);

  this.addArc(x, y - r,
              x + len, y - r,
              x + r, y - len,
              x + r, y);

  this.finished();

}

}  // block

