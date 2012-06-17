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

/// connect ////////////////////////////////////////////////////////////////////

self.prototype.connectFront = function(px, py, cx, cy) {

  this.p0x = px;
  this.p0y = py;
  this.c0x = cx;
  this.c0y = cy;

}

self.prototype.connectBack = function(px, py, cx, cy) {

  this.p1x = px;
  this.p1y = py;
  this.c1x = cx;
  this.c1y = cy;

}

/// reverse ////////////////////////////////////////////////////////////////////

self.prototype.reverse = function() {

  var tmp = this.duplicate();

  this.p0x = tmp.p1x;
  this.p0y = tmp.p1y;
  this.p1x = tmp.p0x;
  this.p1y = tmp.p0y;
  this.c0x = tmp.c1x;
  this.c0y = tmp.c1y;
  this.c1x = tmp.c0x;
  this.c1y = tmp.c0y;

  var _prev = this.prev;
  var _next = this.next;

  this.next = _prev;
  this.prev = _next;

  return this;

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
  this.c0x -= diffX;
  this.c0y -= diffY;

  if(this.prev) {
    cx = this.prev.c1x - diffX;
    cy = this.prev.c1y - diffY;
    this.prev.connectBack(x, y, cx, cy);
  }
};

self.prototype.setAnchorPointOne = function(x, y) {
  var diffX = this.p1x - x;
  var diffY = this.p1y - y;

  this.p1x = x;
  this.p1y = y;
  this.c1x -= diffX;
  this.c1y -= diffY;

  if(this.next) {
    cx = this.next.c0x - diffX;
    cy = this.next.c0y - diffY;
    this.next.connectFront(x, y, cx, cy);
  }
};

self.prototype.setControlPointZero = function(x, y) {
  this.c0x = x;
  this.c0y = y;

//  if(this.prev && this.smoothConnectionFromPrev) {
//    this.prev.c1x = ;
//    this.prev.c1y = ;
//  }
};

self.prototype.setControlPointOne = function(x, y) {
  this.c1x = x;
  this.c1y = y;

//  if(this.next && this.smoothConnectionToNext) {
//    this.next.c0x = ;
//    this.next.c0y = ;
//  }
};

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
    this.prev.c1x = this.c1x;
    this.prev.c1y = this.c1y;
    this.prev.next = this.next;  // this may be null. but no need to care it.

  }

  this.path.removeEdge(this);

};

self.prototype.removeAnchorPointOne = function() {

  if(this.next != null) {

    this.next.p0x = this.p0x;
    this.next.p0y = this.p0y;
    this.next.c0x = this.c0x;
    this.next.c0y = this.c0y;
    this.next.prev = this.prev;  // this may be null. but no need to care it.

  }

  this.path.removeEdge(this);

};

} // block
