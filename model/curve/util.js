/*
 * @author Daisuke Homma
 */

new function() { // block

var self = Anima.Curve;

/// curve manipulation /////////////////////////////////////////////////////////

self.prototype.middleOfLine = function(p0, p1) {
  var x = (p0.x + p1.x) / 2;
  var y = (p0.y + p1.y) / 2;

  return { x: x, y: y };
}

self.prototype.subdivide = function(b) {

  // new bezier curve
  var nb0 = new Anima.Curve();
  var nb1 = new Anima.Curve();

  /// get x //////////////////////////
  nb0.p0x = b.p0x;
  nb1.p1x = b.p1x;

  nb0.cp0x = (b.p0x + b.cp0x) / 2;
  nb1.cp1x = (b.p1x + b.cp1x) / 2;

  var x = (b.cp0x + b.cp1x) / 2;
  nb0.cp1x = (nb0.cp0x + x) / 2;
  nb1.cp0x = (nb1.cp1x + x) / 2;

  nb0.p1x = (nb0.cp1x + nb1.cp0x) / 2;
  nb1.p0x = nb0.p1x;

  /// get y //////////////////////////
  nb0.p0y = b.p0y;
  nb1.p1y = b.p1y;

  nb0.cp0y = (b.p0y + b.cp0y) / 2;
  nb1.cp1y = (b.p1y + b.cp1y) / 2;

  var y = (b.cp0y + b.cp1y) / 2;
  nb0.cp1y = (nb0.cp0y + y) / 2;
  nb1.cp0y = (nb1.cp1y + y) / 2;

  nb0.p1y = (nb0.cp1y + nb1.cp0y) / 2;
  nb1.p0y = nb0.p1y;

  return { b0: nb0, b1: nb1 };
}

self.prototype.divide = function(t) {

  var nb0 = new Anima.Curve();
  var nb1 = new Anima.Curve();

  // TBD

}

self.prototype.duplicate = function() {
  var cv = new Anima.Curve();

  cv.p0x = this.p0x;
  cv.p0y = this.p0y;
  cv.cp0x = this.cp0x;
  cv.cp0y = this.cp0y;
  cv.p1x = this.p1x;
  cv.p1y = this.p1y;
  cv.cp1x = this.cp1x;
  cv.cp1y = this.cp1y;

  return cv;
}

/// getting outer rectangle ////////////////////////////////////////////////////

// boundary rect of this bezier curve (not including control points)
self.prototype.getBoundary = function() {

  var rect = {};

  var xRange = this.getRange(this.p0x, this.cp0x, this.p1x, this.cp1x);
  var yRange = this.getRange(this.p0y, this.cp0y, this.p1y, this.cp1y);

  rect.x = xRange.min;
  rect.y = yRange.min;
  rect.w = xRange.max - xRange.min;
  rect.h = yRange.max - yRange.min;

  return rect;
}

self.prototype.getRange = function(p0, cp0, p1, cp1) {

  var ret = {};

  var roots = this.getRoot(p0, cp0, p1, cp1);
  var positions = [];

  for(var i = 0; i < roots.length; i++) {
    positions.push( this.getPosition(p0, cp0, p1, cp1, roots[i]) );
  }

  positions.push(p0);
  positions.push(p1);

  ret.max = Math.max.apply(null, positions);
  ret.min = Math.min.apply(null, positions);

  return ret;
}

// the position in path at time 't'
self.prototype.getPosition = function(p0, cp0, p1, cp1, t) {

  var tp1 = p0 + (cp0 - p0) * t;
  var tp2 = cp0 + (cp1 - cp0) * t;
  var tp3 = cp1 + (p1 - cp1) * t;

  var tp4 = tp1 + (tp2 - tp1) * t;
  var tp5 = tp2 + (tp3 - tp2) * t;

  var tp6 = tp4 + (tp5 - tp4) * t;

  return tp6;
}

// quadratic formula
self.prototype.getRoot = function(p0, cp0, p1, cp1) {

  ret = [];

  var a  = 3 * cp1 - 3 * cp0 + p0 - p1;
  var b  = 4 * cp0 - 2 * p0 - 2 * cp1;
  var c  = p0 - cp0;

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
  var rect = {};
  var left = Math.min(this.p0x, this.cp0x, this.p1x, this.cp1x);
  var right = Math.max(this.p0x, this.cp0x, this.p1x, this.cp1x);
  var top = Math.max(this.p0y, this.cp0y, this.p1y, this.cp1y);
  var bottom = Math.min(this.p0y, this.cp0y, this.p1y, this.cp1y);

  rect.x = left;
  rect.y = bottom;
  rect.w = right - left;
  rect.h = top - bottom;

  return rect;

}

}  // block
