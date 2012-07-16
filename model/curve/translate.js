/*
 * @author Daisuke Homma
 */

new function() { // block

// Cubic Bezier Curve Translator

var self = an.Curve;

/// translate //////////////////////////////////////////////////////////////////

self.prototype.translate = function(x, y) {

  this.p0x += x;
  this.c0x += x;
  this.c1x += x;
  this.p1x += x;

  this.p0y += y;
  this.c0y += y;
  this.c1y += y;
  this.p1y += y;

};

self.prototype.stickToPrev = function() {

  if( !this.prev ) { return; }

  // diff x, y
  var dx = this.prev.p1x - this.p0x;
  var dy = this.prev.p1y - this.p0y;

  this.translate(dx, dy);

/*
  // test code, to be removed
  for(var i = 0; i < 100; i++) {
    this.translate(dx, dy);
  }
*/

}

/// resize /////////////////////////////////////////////////////////////////////

self.prototype.resize = function(fromX, fromY, scaleX, scaleY) {

  // console.log(fromX, fromY, scaleX, scaleY);
  // console.log("BF", this.p0x, this.p0y, this.c0x, this.c0y,
  //             this.c1x, this.c1y, this.p1x, this.p1y);

  sx = scaleX;
  sy = scaleY;

  if(scaleX <= 0) {
    sx = 0.01;
  }
  this.p0x = fromX + (this.p0x - fromX) * sx;
  this.c0x = fromX + (this.c0x - fromX) * sx
  this.c1x = fromX + (this.c1x - fromX) * sx
  this.p1x = fromX + (this.p1x - fromX) * sx

  if(scaleY <= 0) {
    sy = 0.01;
  }
  this.p0y = fromY + (this.p0y - fromY) * sy
  this.c0y = fromY + (this.c0y - fromY) * sy
  this.c1y = fromY + (this.c1y - fromY) * sy
  this.p1y = fromY + (this.p1y - fromY) * sy

  // console.log("AF", this.p0x, this.p0y, this.c0x, this.c0y,
  //             this.c1x, this.c1y, this.p1x, this.p1y);
}

/// rotate /////////////////////////////////////////////////////////////////////

/**
 * @description rotate curve
 * @param {Number} x x coordinate of the center of rotation
 * @param {Number} y y coordinate of the center of rotation
 * @param {Number} r angle of rotation
 */
self.prototype.rotate = function(x, y, r) {

  var p0 = this.rotatedCoordinate(this.p0x, this.p0y, x, y, r);
  var p1 = this.rotatedCoordinate(this.p1x, this.p1y, x, y, r);
  var c0 = this.rotatedCoordinate(this.c0x, this.c0y, x, y, r);
  var c1 = this.rotatedCoordinate(this.c1x, this.c1y, x, y, r);

  this.p0x = p0.x;
  this.p0y = p0.y;
  this.p1x = p1.x;
  this.p1y = p1.y;
  this.c0x = c0.x;
  this.c0y = c0.y;
  this.c1x = c1.x;
  this.c1y = c1.y;

}

} // block
