/*
 * @author Daisuke Homma
 */

new function() { // block

// Cubic Bezier Curve Modifier

var self = an.Curve;

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

self.prototype.getPoint = function(point) {

  switch(point) {

    case an.k.P0:
      return { x: this.p0x, y: this.p0y };

    case an.k.P1:
      return { x: this.p1x, y: this.p1y };

    case an.k.C0:
      return { x: this.c0x, y: this.c0y };

    case an.k.C1:
      return { x: this.c1x, y: this.c1y };

    default:
      console.log("error in an.Curve#getPoint " + point);
  }

}

self.prototype.setPoint = function(point, x, y) {

  switch(point) {

    case an.k.P0:
      this.setAnchorPointZero(x, y); break;

    case an.k.P1:
      this.setAnchorPointOne(x, y); break;

    case an.k.C0:
      this.setControlPointZero(x, y); break;

    case an.k.C1:
      this.setControlPointOne(x, y); break;

    default:
      console.log("error in an.Curve#setPoint " + point);
  }

}

self.prototype.setAnchorPointZero = function(x, y) {

  // diff x, y
  var dx = this.p0x - x;
  var dy = this.p0y - y;

  this.p0x = x;
  this.p0y = y;
  this.c0x -= dx;
  this.c0y -= dy;

  if(this.prev) {

    cx = this.prev.c1x - dx;
    cy = this.prev.c1y - dy;
    this.prev.connectBack(x, y, cx, cy);

  }
};

self.prototype.setAnchorPointOne = function(x, y) {

  // diff x, y
  var dx = this.p1x - x;
  var dy = this.p1y - y;

  this.p1x = x;
  this.p1y = y;
  this.c1x -= dx;
  this.c1y -= dy;

  if(this.next) {

    cx = this.next.c0x - dx;
    cy = this.next.c0y - dy;
    this.next.connectFront(x, y, cx, cy);

  }
};

self.prototype.setControlPointZero = function(x, y) {

  var smooth = this.smoothConnectFromPrev();
  var keep = this.keepConnectRatio();

  if(smooth) {

    var dx = x - this.p0x;
    var dy = y - this.p0y;

    var ratio;

    if(keep) {

      ratio = this.prev.getConnectRatio();

    } else {

      var len = this.lineLength(dx, dy);

      var pdx = this.prev.c1x - this.prev.p1x;
      var pdy = this.prev.c1y - this.prev.p1y;
      var plen = this.lineLength(pdx, pdy);

      if( (len == 0) || (plen == 0) ) {
        ratio = 0;
      } else {
        ratio = plen / len;
      }

    }

    var px = this.p0x - (dx * ratio);
    var py = this.p0y - (dy * ratio);

    this.prev.c1x = px;
    this.prev.c1y = py;
    
  }

  this.c0x = x;
  this.c0y = y;

};

self.prototype.setControlPointOne = function(x, y) {

  var smooth = this.smoothConnectToNext();
  var keep = this.keepConnectRatio();

  if(smooth) {

    var dx = x - this.p1x;
    var dy = y - this.p1y;

    var ratio;

    if(keep) {

      ratio = this.getConnectRatio();

    } else {

      var len = this.lineLength(dx, dy);

      var ndx = this.next.c0x - this.next.p0x;
      var ndy = this.next.c0y - this.next.p0y;
      var nlen = this.lineLength(ndx, ndy);

      if( (len == 0) || (nlen == 0) ) {
        ratio = 0;
      } else {
        ratio = nlen / len;
      }

    }

    var nx = this.p1x - (dx * ratio);
    var ny = this.p1y - (dy * ratio);

    this.next.c0x = nx;
    this.next.c0y = ny;
 
  }

  this.c1x = x;
  this.c1y = y;

};

/// remove point ///////////////////////////////////////////////////////////////

self.prototype.removePoint = function(point) {

  switch(point) {

    case an.k.P0:
      this.removeAnchorPointZero(); break;

    case an.k.P1:
      this.removeAnchorPointOne(); break;

    default:
      console.log("error in an.Curve#removePoint " + point);
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

  var p = this.getPath();
  p.removeEdge(this);

};

self.prototype.removeAnchorPointOne = function() {

  if(this.next != null) {

    this.next.p0x = this.p0x;
    this.next.p0y = this.p0y;
    this.next.c0x = this.c0x;
    this.next.c0y = this.c0y;
    this.next.prev = this.prev;  // this may be null. but no need to care it.

  }

  var p = this.getPath();
  p.removeEdge(this);

};

/// divide /////////////////////////////////////////////////////////////////////

self.prototype.subdivide = function() {

  var subcurve = this.getHalfCurves();

  this.c0x = subcurve.b0.c0x;
  this.c0y = subcurve.b0.c0y;
  this.p1x = subcurve.b0.p1x;
  this.p1y = subcurve.b0.p1y;
  this.c1x = subcurve.b0.c1x;
  this.c1y = subcurve.b0.c1y;

  var p = this.getPath();
  p.insertEdgeAfter(this, subcurve.b1);

}

} // block
