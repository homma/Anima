/*
 * @author Daisuke Homma
 */

new function() { // block

// Cubic Bezier Curve Modifier

var self = Anima.Curve;

/// get information ////////////////////////////////////////////////////////////

self.prototype.getAnchorPointZero = function() {
  return { x: this.p0x, y: this.p0y };
};

self.prototype.getAnchorPointOne = function() {
  return { x: this.p1x, y: this.p1y };
}

/// transform //////////////////////////////////////////////////////////////////

self.prototype.setSelectedPoint = function(x, y) {

  // AnchorPointZero  = 0;
  // ControlPointZero = 1;
  // AnchorPointOne   = 2;
  // ControlPointOne  = 3;

  switch(this.selectedPoint) {

    case this.AnchorPointZero:
      this.setAnchorPointZero(x, y); break;

    case this.ControlPointZero:
      this.setControlPointZero(x, y); break;

    case this.AnchorPointOne:
      this.setAnchorPointOne(x, y); break;

    case this.ControlPointOne:
      this.setControlPointOne(x, y); break;

  }

}

self.prototype.setAnchorPointZero = function(x, y) {
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

self.prototype.setAnchorPointOne = function(x, y) {
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

self.prototype.setControlPointZero = function(x, y) {
  this.cp0x = x;
  this.cp0y = y;

//  if(this.prev && this.smoothConnectionFromPrev) {
//    this.prev.cp1x = ;
//    this.prev.cp1y = ;
//  }
};

self.prototype.setControlPointOne = function(x, y) {
  this.cp1x = x;
  this.cp1y = y;

//  if(this.next && this.smoothConnectionToNext) {
//    this.next.cp0x = ;
//    this.next.cp0y = ;
//  }
};

/// translate //////////////////////////////////////////////////////////////////

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

/// remove point ///////////////////////////////////////////////////////////////

self.prototype.removeSelectedPoint = function() {

  switch(this.selectedPoint) {

    case this.AnchorPointZero:
      this.removeAnchorPointZero(); break;

    case this.AnchorPointOne:
      this.removeAnchorPointOne(); break;

  }
}

self.prototype.removeAnchorPointZero = function() {

  if(this.prev != null) {

    this.prev.p1x = this.p1x;
    this.prev.p1y = this.p1y;
    this.prev.cp1x = this.cp1x;
    this.prev.cp1y = this.cp1y;
    this.prev.next = this.next;  // this may be null. but no need to care it.

  }

  this.path.removeEdge(this);

};

self.prototype.removeAnchorPointOne = function() {

  if(this.next != null) {

    this.next.p0x = this.p0x;
    this.next.p0y = this.p0y;
    this.next.cp0x = this.cp0x;
    this.next.cp0y = this.cp0y;
    this.next.prev = this.prev;  // this may be null. but no need to care it.

  }

  this.path.removeEdge(this);

};

} // block
