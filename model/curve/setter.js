/*
 * @author Daisuke Homma
 */

new function() { // block

// Cubic Bezier Curve Parameters

var self = an.Curve;

/// get information ////////////////////////////////////////////////////////////

self.prototype.getAnchorPointZero = function() {
  return { x: this.p0x, y: this.p0y };
};

self.prototype.getAnchorPointOne = function() {
  return { x: this.p1x, y: this.p1y };
}

self.prototype.getPath = function() {

  if(this.path == null) {
    console.log("an.Curve#getPath failed. see an.Path#addEdge for the detail");
  }

  return this.path;
}

self.prototype.smoothConnectToNext = function() {

  if(this.next) {
    return this.smoothConnect;
  }

  return false;

}

self.prototype.smoothConnectFromPrev = function() {

  if(this.prev) {
    return this.prev.smoothConnectToNext();
  }

  return false;

}

/**
 * @description set/unset smoothly connect to next curve
 * @param {Boolean} f
 */
self.prototype.setSmoothConnect = function(f) {

  this.smoothConnect = f;

}

// ( this.c1 - this.p1 ) / ( this.next.c0 - this.next.p0 )
self.prototype.getConnectRatio = function() {

  var ratio;

  var dx = this.c1x - this.p1x;
  var dy = this.c1y - this.p1y;
  var len = this.lineLength(dx, dy);

  var ndx = this.next.c0x - this.next.p0x;
  var ndy = this.next.c0y - this.next.p0y;
  var nlen = this.lineLength(ndx, ndy);

  if( (len == 0) || (nlen == 0) ) {
    ratio = 0;
  } else {
    ratio = len / nlen;
  }

  return ratio;

}

self.prototype.keepConnectRatio = function() {

  // disabled for now
  return false;

}

} // block
