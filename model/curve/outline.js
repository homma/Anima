/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.Curve;

/// drawing outline path for test //////////////////////////////////////////////

self.prototype.drawOutLine = function(ctx, w) {

  var outline = this.outLinePath(w);
  outline.drawEdge(ctx);
  outline.drawHandle(ctx);

}

/// getting outline path ///////////////////////////////////////////////////////

self.prototype.outLinePath = function(w) {

  // dot
  if( this.isDot() ) { return this.dotOutLine(w); }

  // vertical line
  if( this.isVerticalLine() ) { return this.verticalLineOutLine(w); }

  // horizontal line
  if( this.isHorizontalLine() ) { return this.horizontalLineOutLine(w); }

  // sloped line
  if( this.isLine() ) { return this.lineOutLine(w); }

  // not a dot nor a line
  return this.curveOutLine(w);

}

/// outline for dot ////////////////////////////////////////////////////////////

self.prototype.dotOutLine = function(w) {

  var path = new an.Path();
  path.createCircle(this.p0x, this.p0y, w, w);

  return path;

}

/// outline for vertical line //////////////////////////////////////////////////

self.prototype.verticalLineOutLine = function(w) {

  var path = new an.Path();
  var x = Math.max(this.p0x, this.p1x);
  var y = Math.max(this.p0y, this.p1y);
  var h = Math.abs(this.p0y - this.p1y);
  path.createRectangle(x, y, w, h);

  return path;

}

/// outline for horizontal line ////////////////////////////////////////////////

self.prototype.horizontalLineOutLine = function(h) {

  var path = new an.Path();
  var x = Math.min(this.p0x, this.p1x);
  var y = Math.max(this.p0y, this.p1y);
  var w = Math.abs(this.p0x - this.p1x);
  path.createRectangle(x, y, w, h);

  return path;

}

/// outline for line ///////////////////////////////////////////////////////////

self.prototype.lineOutLine = function(w) {

  // just for making sure
  // if(this.p0x == this.p1x) { return this.horizontalLineOutLine(w); }
  // if(this.p0y == this.p1y) { return this.verticalLineOutLine(w); }

  var diff = this.diffToNewLine(this.p0x, this.p0y, this.p1x, this.p1y, w);

  var path = new an.Path();
  var polyline = [ { x: this.p0x - diff.w, y: this.p0y + diff.h },
                   { x: this.p1x - diff.w, y: this.p1y + diff.h },
                   { x: this.p1x + diff.w, y: this.p1y - diff.h },
                   { x: this.p0x + diff.w, y: this.p0y - diff.h } ];
  path.createPolyLine(polyline);

  return path;

}

/// helper method for outline of line //////////////////////////////////////////

// calculates the x diff and y diff from (x0, y0) - (x1, y1) line
self.prototype.diffToNewLine = function(x0, y0, x1, y1, w) {

  var dx = x0 - x1;  // delta x
  var sdx = dx * dx;   // square of delta x; Math.pow(dx, 2)
  var dy = y0 - y1;  // delta y
  var sdy = dy * dy;   // square of delta y; Math.pow(dy, 2)
  var sw  = w*2        // square of w
  var div = sdx + sdy; // divider: temporary number

  var w_ = 0;
  var h_ = 0;

  if(div != 0) {
    w_ = Math.sqrt(sw * (sdx / (div)) );
    h_ = Math.sqrt(sw * (sdy / (div)) );
  }

  // inverse
  var height = w_;
  var width  = h_;

  // add direction
  if( x0 > x1 ) { height = -height; }
  if( y0 > y1 ) { width  = -width; }

  return { w: width, h: height };

}

/// outline for curve //////////////////////////////////////////////////////////

// broken: this must be fixed!!
// before using this, make sure with isCurve() that it is a curve
self.prototype.curveOutLine = function(width) {

  // cv (curve): p0x, p0y, c0x, c0y, p1x, p1y, c1x, c1y
  var cv1 = {}; // curve from right of p0 to left of p1
  var cv2 = {}; // curve from left of p0 to right of p1

  // helper methods
  var left = an.Relatively.isLeft;
  var right = an.Relatively.isRight;

  var p0IsCp0 = false;
  var p1IsCp1 = false;

  if( (this.p0x == this.c0x) && (this.p0y == this.c0y) ) {
    // when p0 == c0
    p0IsCp0 = true;

  } else if ( (this.p1x == this.c1x) && (this.p1y == this.c1y) ) {
    // when p1 == c1
    p1IsCp1 = true;

  }

  //// this.p0 ////

  if(p0IsCp0) {

    var diff;
    diff = this.diffToNewLine(this.p0x, this.p0y, this.c1x, this.c1y, width);

    cv1.c0x = cv1.p0x = this.p0x - diff.w;
    cv1.c0y = cv1.p0y = this.p0y + diff.h;

    cv2.c1x = cv2.p1x = this.p0x + diff.w;
    cv2.c1y = cv2.p1y = this.p0y - diff.h;

  } else {

    var diff;
    diff = this.diffToNewLine(this.p0x, this.p0y, this.c0x, this.c0y, width);

    cv1.p0x = this.p0x + diff.w;
    cv1.p0y = this.p0y - diff.h;

    cv2.p1x = this.p0x - diff.w;
    cv2.p1y = this.p0y + diff.h;

    // cv1.p0 is inside or outside
    var inside;
    // if c1 is on the right side, then the right side of p0 is inside.
    // thus, cv1.p0 is inside.
    inside = right(this.p0x, this.p0y, this.c0x, this.c0y,
                   this.c1x, this.c1y);

    var w = this.p0x - this.c0x;
    var h = this.p0y - this.c0y;
    var aw = Math.abs(w);
    var ah = Math.abs(h);
    var adw = Math.abs(diff.w);
    var adh = Math.abs(diff.h);

    if(inside) {

      // cv1 is inside
      if( aw < adw ) {
        cv1.c0x = cv1.p0x;
      } else {  // normal
        cv1.c0x = cv1.p0x - w * ( aw - adw ) / aw;
      }
      if( ah < adh ) {
        cv1.c0y = cv1.p0y;
      } else {  // normal
        cv1.c0y = cv1.p0y - h * ( ah - adh ) / ah;
      }

      // cv2 is outside
      cv2.c1x = cv2.p1x - w * ( aw + adw ) / aw;
      cv2.c1y = cv2.p1y - h * ( ah + adh ) / ah;


    } else { // outside

      // cv1 is outside
      cv1.c0x = cv1.p0x - w * ( aw + adw ) / aw;
      cv1.c0y = cv1.p0y - h * ( ah + adh ) / ah;

      // cv2 is inside
      if( aw < adw ) {
        cv2.c1x = cv2.p1x;
      } else { // normal
        cv2.c1x = cv2.p1x - w * ( aw - adw ) / aw;
      }
      if( ah < adh ) {
        cv2.c1y = cv2.p1y;
      } else { // normal
        cv2.c1y = cv2.p1y - h * ( ah - adh ) / ah;
      }

    }

  }

  //// this.p1 ////

  if(p1IsCp1) {

    var diff;
    diff = this.diffToNewLine(this.p1x, this.p1y, this.c0x, this.c0y, width);

    cv1.c1x = cv1.p1x = this.p1x + diff.w;
    cv1.c1y = cv1.p1y = this.p1y - diff.h;

    cv2.c0x = cv2.p0x = this.p1x - diff.w;
    cv2.c0y = cv2.p0y = this.p1y + diff.h;


  } else {

    var diff;
    diff = this.diffToNewLine(this.p1x, this.p1y, this.c1x, this.c1y, width);

    cv1.p1x = this.p1x - diff.w;
    cv1.p1y = this.p1y + diff.h;

    cv2.p0x = this.p1x + diff.w;
    cv2.p0y = this.p1y - diff.h;

    // cv1.p1 is inside or outside
    var inside;
    // if c0 is on the left side, then the left side of p1 is inside.
    // thus, cv1.p1 is inside.
    inside = left(this.p1x, this.p1y, this.c1x, this.c1y,
                  this.c0x, this.c0y);

    var w = this.p1x - this.c1x;
    var h = this.p1y - this.c1y;
    var aw = Math.abs(w);
    var ah = Math.abs(h);
    var adw = Math.abs(diff.w);
    var adh = Math.abs(diff.h);

    if(inside) {

      // cv1 is inside
      if( aw < adw ) {
        cv1.c1x = cv1.p1x;
      } else {  // normal
        cv1.c1x = cv1.p1x - w * ( aw - adw ) / aw;
      }
      if( ah < adh ) {
        cv1.c1y = cv1.p1y;
      } else {  // normal
        cv1.c1y = cv1.p1y - h * ( ah - adh ) / ah;
      }

      // cv2 is outside
      cv2.c0x = cv2.p0x - w * ( aw + adw ) / aw;
      cv2.c0y = cv2.p0y - h * ( ah + adh ) / ah;

    } else { // outside

      // cv1 is outside
      cv1.c1x = cv1.p1x - w * ( aw + adw ) / aw;
      cv1.c1y = cv1.p1y - h * ( ah + adh ) / ah;

      // cv2 is inside
      if( aw < adh ) {
        cv2.c0x = cv2.p0x;
      } else { // normal
        cv2.c0x = cv2.p0x - w * ( aw - adw ) / aw;
      }
      if( ah < adh ) {
        cv2.c0y = cv2.p0y;
      } else { // normal
        cv2.c0y = cv2.p0y - h * ( ah - adh ) / ah;
      }

    }

  }

  // adjustment
  // if cv1.p0 and cv1.p1 are both inner and 'w' was too large,
  // it may be crossed

  // also, in case of cv2.p0 and cv2.p1 are both inner

  // creating path
  var path = new an.Path();
  var e1 = new an.Curve(cv1.p0x, cv1.p0y, cv1.c0x, cv1.c0y,
                       cv1.c1x, cv1.c1y, cv1.p1x, cv1.p1y);
  var e2 = new an.Curve(cv1.p1x, cv1.p1y, cv1.p1x, cv1.p1y,
                       cv2.p0x, cv2.p0y, cv2.p0x, cv2.p0y);
  var e3 = new an.Curve(cv2.p0x, cv2.p0y, cv2.c0x, cv2.c0y,
                       cv2.c1x, cv2.c1y, cv2.p1x, cv2.p1y);
  var e4 = new an.Curve(cv2.p1x, cv2.p1y, cv2.p1x, cv2.p1y,
                       cv1.p0x, cv1.p0y, cv1.p0x, cv1.p0y);
  path.addEdge(e1);
  path.addEdge(e2);
  path.addEdge(e3);
  path.addEdge(e4);

  path.finished();

  return path;

}

}  // block

