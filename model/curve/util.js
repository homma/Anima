/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.Curve;

/// curve manipulation /////////////////////////////////////////////////////////

self.prototype.middleOfLine = function(p0, p1) {
  var x = (p0.x + p1.x) / 2;
  var y = (p0.y + p1.y) / 2;

  return { x: x, y: y };
}

self.prototype.subdivide = function(b) {

  // new bezier curve
  var nb0 = new an.Curve();
  var nb1 = new an.Curve();

  /// get x //////////////////////////
  nb0.p0x = b.p0x;
  nb1.p1x = b.p1x;

  nb0.c0x = (b.p0x + b.c0x) / 2;
  nb1.c1x = (b.p1x + b.c1x) / 2;

  var x = (b.c0x + b.c1x) / 2;
  nb0.c1x = (nb0.c0x + x) / 2;
  nb1.c0x = (nb1.c1x + x) / 2;

  nb0.p1x = (nb0.c1x + nb1.c0x) / 2;
  nb1.p0x = nb0.p1x;

  /// get y //////////////////////////
  nb0.p0y = b.p0y;
  nb1.p1y = b.p1y;

  nb0.c0y = (b.p0y + b.c0y) / 2;
  nb1.c1y = (b.p1y + b.c1y) / 2;

  var y = (b.c0y + b.c1y) / 2;
  nb0.c1y = (nb0.c0y + y) / 2;
  nb1.c0y = (nb1.c1y + y) / 2;

  nb0.p1y = (nb0.c1y + nb1.c0y) / 2;
  nb1.p0y = nb0.p1y;

  return { b0: nb0, b1: nb1 };
}

self.prototype.divide = function(t) {

  var nb0 = new an.Curve();
  var nb1 = new an.Curve();

  // TBD

}

// copy this curve to a new curve object
self.prototype.duplicate = function() {
  var cv = new an.Curve();

  cv.p0x = this.p0x;
  cv.p0y = this.p0y;
  cv.c0x = this.c0x;
  cv.c0y = this.c0y;
  cv.p1x = this.p1x;
  cv.p1y = this.p1y;
  cv.c1x = this.c1x;
  cv.c1y = this.c1y;

  return cv;
}

/// getting outer rectangle ////////////////////////////////////////////////////

// boundary rect of this bezier curve (not including control points)
self.prototype.getBoundary = function() {

  var rect = {};

  var xRange = this.getRange(this.p0x, this.c0x, this.p1x, this.c1x);
  var yRange = this.getRange(this.p0y, this.c0y, this.p1y, this.c1y);

  rect.x = xRange.min;
  rect.y = yRange.min;
  rect.w = xRange.max - xRange.min;
  rect.h = yRange.max - yRange.min;

  return rect;
}

self.prototype.getRange = function(p0, c0, p1, c1) {

  var ret = {};

  var roots = this.getRoot(p0, c0, p1, c1);
  var positions = [];

  for(var i = 0; i < roots.length; i++) {
    positions.push( this.getPosition(p0, c0, p1, c1, roots[i]) );
  }

  positions.push(p0);
  positions.push(p1);

  ret.max = Math.max.apply(null, positions);
  ret.min = Math.min.apply(null, positions);

  return ret;
}

// the position in path at time 't'
self.prototype.getPosition = function(p0, c0, p1, c1, t) {

  var tp1 = p0 + (c0 - p0) * t;
  var tp2 = c0 + (c1 - c0) * t;
  var tp3 = c1 + (p1 - c1) * t;

  var tp4 = tp1 + (tp2 - tp1) * t;
  var tp5 = tp2 + (tp3 - tp2) * t;

  var tp6 = tp4 + (tp5 - tp4) * t;

  return tp6;
}

// quadratic formula
self.prototype.getRoot = function(p0, c0, p1, c1) {

  ret = [];

  var a  = 3 * c1 - 3 * c0 + p0 - p1;
  var b  = 4 * c0 - 2 * p0 - 2 * c1;
  var c  = p0 - c0;

  if( a == 0 ) {

    var val = null;
    if( b == 0 ) {
      val = -c;
    } else {
      val = -c / b;
    }

    if( (0 <= val) && (val <= 1) ) {
      ret.push(val);
    }

    return ret;
  }

  var b2 = b * b;
  var ac4 = 4 * a * c;
  var b2_ac4 = b2 - ac4;
  var a2 = 2 * a;

  if( 0 <= b2_ac4) {
    var m  = Math.sqrt(b2_ac4);

    var plus  = (-b + m) / a2;
    if( (0 <= plus) && (plus <= 1) ) {
      ret.push(plus);
    }

    var minus = (-b - m) / a2;
    if( (0 <= minus) && (minus <= 1) ) {
      ret.push(minus);
    }

  }

  return ret;
}

// returns a rectangle which includes this curve with margin
self.prototype.getSurroundingRectWithMargin = function(margin) {

  var rect = this.getSurroundingRect();

  // adjustment
  rect.x -= margin;
  rect.w += margin * 2;
  rect.y -= margin;
  rect.h += margin * 2;

  return rect;

}

// boundary which includes this curve
self.prototype.getSurroundingRect = function() {

  // calculate the boundary
  var rect   = {};
  var left   = Math.min(this.p0x, this.c0x, this.p1x, this.c1x);
  var right  = Math.max(this.p0x, this.c0x, this.p1x, this.c1x);
  var top    = Math.max(this.p0y, this.c0y, this.p1y, this.c1y);
  var bottom = Math.min(this.p0y, this.c0y, this.p1y, this.c1y);

  rect.x = left;
  rect.y = bottom;
  rect.w = right - left;
  rect.h = top - bottom;

  return rect;

}

}  // block
