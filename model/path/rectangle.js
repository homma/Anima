/*
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

  if( w < 1 ) { w = 1; }
  if( h < 1 ) { h = 1; }

  this.addLine(x, y, x + w, y);
  this.addLine(x + w, y, x + w, y + h);
  this.addLine(x + w, y + h, x, y + h);
  this.addLine(x, y + h, x, y);

  this.finished();

}

}  // block

