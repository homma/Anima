/*
 * @author Daisuke Homma
 */

new function() { // block

var self = Anima.Curve;

// margin:
// the distance between the mouse pointer and this curve.
// if it is below this value, it is considered as near enough.

// minSize:
// if one of the edges of the bounding rect is smaller than this size,
// the mouse pointer is near enough to this curve.

// hit test for curves
self.prototype.hitTest = function(x, y, w) {

  var margin = 2;
  var minSize = w + margin + 8;
  var depth = 10;

  // console.log(margin, minSize);

  return this._hitTest(x, y, depth, margin, minSize);

}

/// Hit Test for Handles ///////////////////////////////////////////////////////

// hit test for the circle portion of a handle
self.prototype.hitTestHandle = function(x, y) {
  var hit = false;

  hit = this.hitTestAnchorPoint(x, y);
  if(hit) { return hit; };

  hit = this.hitTestControlPoint(x, y);
  return hit;

}

self.prototype.hitTestAnchorPoint = function(x, y) {

  var hit = false;

  // AnchorPointZero  = 0;
  // AnchorPointOne   = 2;

  if( this._isNearThePoint(this.p0x, this.p0y, x, y) ) {

    this.selectedPoint = this.AnchorPointZero;
    hit = this;

  } else if ( this._isNearThePoint(this.p1x, this.p1y, x, y) ) {

    this.selectedPoint = this.AnchorPointOne;
    hit = this;

  }

  return hit;

}

self.prototype.hitTestControlPoint = function(x, y) {

  var hit = false;

  // ControlPointZero = 1;
  // ControlPointOne  = 3;

  if ( this._isNearThePoint(this.cp0x, this.cp0y, x, y) ) {

    this.selectedPoint = this.ControlPointZero;
    hit = this;

  } else if ( this._isNearThePoint(this.cp1x, this.cp1y, x, y) ) {

    this.selectedPoint = this.ControlPointOne;
    hit = this;

  };

  return hit;

}

self.prototype._isNearThePoint = function(x0, y0, x1, y1) {
  var radius = 4;

  if( ( x0 - radius < x1 ) && ( x0 + radius > x1 )
      && ( y0 - radius < y1 ) && (y0 + radius > y1 ) ) {
    return true;
  }

  return false;
}

/// Hit Test for Curve /////////////////////////////////////////////////////////

self.prototype._hitTest = function(x, y, depth, margin, minSize) {

  // calculate the boundary including control points
  var rect = this.getSurroundingRect();

  // consider the margin
  rect.x -= margin;
  rect.w += margin * 2;
  rect.y -= margin;
  rect.h += margin * 2;

  if(! this._isInRect(x, y, rect) ) return false;

  if( this._isSmallEnough(rect, minSize) ) return true;

  // give up if the recursion gets too deep.
  if( depth < 0 ) {
    // console.log("maximum depth exceeded.");
    return false;
  }
  // console.log("depth", depth);

  var subBezier = this.subdivide(this);
  if( (subBezier.b0._hitTest(x, y, depth - 1, margin, minSize)) ||
      (subBezier.b1._hitTest(x, y, depth - 1, margin, minSize)) ) {
    return true;
  }

  return false;

}

self.prototype._isInRect = function(x, y, rect) {

  if( (rect.x <= x) && ( (rect.x + rect.w) >= x) &&
      (rect.y <= y) && ( (rect.y + rect.h) >= y) ) {
    return true;
  }

  return false;

}

self.prototype._isSmallEnough = function(rect, minSize) {

  if( (rect.w <= minSize) || (rect.h <= minSize) ) {
    return true;
  }

  return false;

}

}; // block

