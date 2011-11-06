/*
 * @author Daisuke Homma
 */

new function() { // block

// Cubic Bezier Curve Modifier

var self = Anima.Curve;

self.prototype.getFirstPoint = function() {
  return { x: this.p0x, y: this.p0y };
};

self.prototype.setFirstPoint = function(x, y) {
  var diffX = this.p0x - x;
  var diffY = this.p0y - y;

  this.p0x = x;
  this.p0y = y;
  this.cp0x -= diffX;
  this.cp0y -= diffY;

  if(this.prev) {
    this.prev.p1x = x;
    this.prev.p1y = y;
    this.prev.cp1x -= diffX;
    this.prev.cp1y -= diffY;
  }
};

self.prototype.getSecondPoint = function() {
  return { x: this.p1x, y: this.p1y };
}

self.prototype.setSecondPoint = function(x, y) {
  var diffX = this.p1x - x;
  var diffY = this.p1y - y;

  this.p1x = x;
  this.p1y = y;
  this.cp1x -= diffX;
  this.cp1y -= diffY;

  if(this.next) {
    this.next.p0x = x;
    this.next.p0y = y;
    this.next.cp0x -= diffX;
    this.next.cp0y -= diffY;
  }
};

self.prototype.setFirstControlPoint = function(x, y) {
  this.cp0x = x;
  this.cp0y = y;

  if(this.prev && this.smoothConnectionFromPrev) {
//    this.prev.cp1x = ;
//    this.prev.cp1y = ;
  }
};

self.prototype.setSecondControlPoint = function(x, y) {
  this.cp1x = x;
  this.cp1y = y;

  if(this.next && this.smoothConnectionToNext) {
//    this.next.cp0x = ;
//    this.next.cp0y = ;
  }
};

self.prototype.translate = function(x, y) {

  this.p0x  += x;
  this.cp0x += x;
  this.cp1x += x;
  this.p1x  += x;

  this.p0y  += y;
  this.cp0y += y;
  this.cp1y += y;
  this.p1y  += y;

};

/// resize /////////////////////////////////////////////////////////////////////

self.prototype.resize = function(fromX, fromY, scaleX, scaleY) {

  // console.log(fromX, fromY, scaleX, scaleY);
  // console.log("BF", this.p0x, this.p0y, this.cp0x, this.cp0y,
  //             this.cp1x, this.cp1y, this.p1x, this.p1y);

  sx = scaleX;
  sy = scaleY;

  if(scaleX <= 0) {
    sx = 0.01;
  }
  this.p0x  = fromX + (this.p0x - fromX) * sx;
  this.cp0x = fromX + (this.cp0x - fromX) * sx
  this.cp1x = fromX + (this.cp1x - fromX) * sx
  this.p1x  = fromX + (this.p1x - fromX) * sx

  if(scaleY <= 0) {
    sy = 0.01;
  }
  this.p0y  = fromY + (this.p0y - fromY) * sy
  this.cp0y = fromY + (this.cp0y - fromY) * sy
  this.cp1y = fromY + (this.cp1y - fromY) * sy
  this.p1y  = fromY + (this.p1y - fromY) * sy

  // console.log("AF", this.p0x, this.p0y, this.cp0x, this.cp0y,
  //             this.cp1x, this.cp1y, this.p1x, this.p1y);
}

} // block
