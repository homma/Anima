/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.Curve;

/// Hit Test for Curve /////////////////////////////////////////////////////////

self.prototype.onCurve = function(ctx, x, y, w) {

  var margin = 4;
  var m = w + margin;

  var near = this.inSurroundingRect(x, y, m);
  if(!near) { return false; };

  // in the curve
  var depth = 10;
  var minSize = w + margin + 8;
  var on = this.onSubCurve(x, y, depth, margin, minSize);
  if(on) { return { curve: this } };

  // above lines should be replaced with:
  // var on = this.outLinePath(m).isPointInPath(ctx, x, y);
  // if(on) { return { curve: this } };

  // on the edge of the curve
  var onAnchor = this.isOnAnchorPoints(ctx, x, y, w);
  if(onAnchor) { return { curve: this } };

  return false;

}

/// Helper Methods for onCurve() ///////////////////////////////////////////////

self.prototype.inSurroundingRect = function(x, y, margin) {

  var rect = this.getSurroundingRectWithMargin(margin);
  return this.inRect(x, y, rect);

}

self.prototype.inRect = function(x, y, rect) {

  if( (rect.x <= x) && ( (rect.x + rect.w) >= x) &&
      (rect.y <= y) && ( (rect.y + rect.h) >= y) ) {
    return true;
  }

  return false;

}

self.prototype.onSubCurve = function(x, y, depth, margin, minSize) {

  // calculate the boundary including control points
  var rect = this.getSurroundingRect();

  // consider the margin
  rect.x -= margin;
  rect.w += margin * 2;
  rect.y -= margin;
  rect.h += margin * 2;

  if(! this.inRect(x, y, rect) ) return false;

  if( this.smallEnough(rect, minSize) ) return true;

  // give up if the recursion gets too deep.
  if( depth < 0 ) {
    return false;
  }

  var subBezier = this.getHalfCurves();
  if( (subBezier.b0.onSubCurve(x, y, depth - 1, margin, minSize)) ||
      (subBezier.b1.onSubCurve(x, y, depth - 1, margin, minSize)) ) {
    return true;
  }

  return false;

}

self.prototype.smallEnough = function(rect, minSize) {

  if( (rect.w <= minSize) || (rect.h <= minSize) ) {
    return true;
  }

  return false;

}

/// Hit Test for Handles ///////////////////////////////////////////////////////

/**
 * @description hit test for the circle portion of a handle
 * @returns {Ad-hoc object|null} hit position information
 */
self.prototype.isOnHandle = function(ctx, x, y, w) {

  var hit = null;

  hit = this.isOnAnchorPoints(ctx, x, y, w);
  if(hit) { return hit; };

  hit = this.isOnControlPoints(ctx, x, y);
  if(hit) { return hit; };

  return hit;

}

/**
 * @description hit test for the anchor point
 * @returns {Ad-hoc object|null} hit position information
 */
self.prototype.isOnAnchorPoints = function(ctx, x, y, w) {

  var res = null;

  res = this.isOnPoint(ctx, this.p0x, this.p0y, w, x, y);
  if(res) {
    return {curve: this, point: an.k.P0};
  };

  res = this.isOnPoint(ctx, this.p1x, this.p1y, w, x, y);
  if(res) {
    return {curve: this, point: an.k.P1};
  };

  return res;

}

/**
 * @description hit test for the control point
 * @returns {Ad-hoc object|null} hit position information
 */
self.prototype.isOnControlPoints = function(ctx, x, y) {

  var res = null;

  res = this.isOnPoint(ctx, this.c0x, this.c0y, 0, x, y);
  if(res) {
    return {curve: this, point: an.k.C0};
  };

  res = this.isOnPoint(ctx, this.c1x, this.c1y, 0, x, y);
  if(res) {
    return {curve: this, point: an.k.C1};
  };

  return res;

}

/// Helper Methods /////////////////////////////////////////////////////////////

self.prototype.isOnPoint = function(ctx, px, py, w, tx, ty) {
// check if (px, py) is hit by (tx, ty)

  var res = false;

  var margin = 4;
  var m = w + margin;

  ctx.save();

  ctx.beginPath();
  ctx.arc(px, py, m, 0, 2 * Math.PI, true);

  res = ctx.isPointInPath(tx, ty);

  ctx.restore();

  return res;

}

}; // block

