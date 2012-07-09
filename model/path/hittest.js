/*
 * @author Daisuke Homma
 */

new function() {  // block

/// hittest ////////////////////////////////////////////////////////////////////

var self = an.Path;

/**
 * @description test the coordinate is on a curve or not
 * @param {Canvas Context} ctx
 * @param {Number} x x-coordinate
 * @param {Number} y y-coordinate
 * @returns {Curve|null} a curve when hit
 */
self.prototype.onCurve = function(ctx, x, y) {

  var ret = null;

  for (var i = 0; this.edges.length > i; i++) {
    var hit = this.edges[i].onCurve(ctx, x, y, this.lineWidth);
    if(hit) {
      ret = this.edges[i]
      break;
    }
  }

  return ret;

}

/**
 * @description test the coordinate is in a path or not
 * @param {Canvas Context} ctx
 * @param {Number} x x-coordinate
 * @param {Number} y y-coordinate
 * @returns {Boolean} on a path or not
 */
self.prototype.onPath = function(ctx, x, y) {

  var hit = false;

  for (var i = 0; this.edges.length > i; i++) {
    hit = this.edges[i].onCurve(ctx, x, y, this.lineWidth);
    if(hit) break;
  }

  if(hit) return hit;

  // check closing edge if this.closePath == true
  if( this.getClosePath() ) {
    var p0 = this.getEndPoint();
    var p1 = this.getBeginPoint();

    var cv = new an.Curve(p0.x, p0.y, p0.x, p0.y, p1.x, p1.y, p1.x, p1.y);
    hit = cv.onCurve(ctx, x, y, this.lineWidth);

  }

  if(hit) return hit;

  if( this.getFill() ) {
    hit = this.isPointInPath(ctx, x, y);
  }

  return hit;
}

self.prototype.isPointInPath = function(ctx, x, y) {

  var res = false;

  ctx.save();

  this.setupContext(ctx);

  ctx.beginPath();

  var pt = this.getBeginPoint();
  ctx.moveTo(pt.x, pt.y);

  this.edges.forEach( function(edge) { edge.draw(ctx); });

  if( this.getClosePath() ) {  // true if this.closePath == true
    ctx.closePath();
  }

  res = ctx.isPointInPath(x, y);

  ctx.restore();

  return res;

}

self.prototype.isOnHandle = function(ctx, x, y) {

  var hitInfo = null;

  for (var i = 0; this.edges.length > i; i++) {
    hitInfo = this.edges[i].isOnHandle(ctx, x, y, this.lineWidth);
    if(hitInfo) {
      hitInfo.path = this;
      return hitInfo;
    }
  }

  return hitInfo;

}

self.prototype.isOnAnchorPoints = function(ctx, x, y) {

  var hitInfo = null;

  for (var i = 0; this.edges.length > i; i++) {
    hitInfo = this.edges[i].isOnAnchorPoints(ctx, x, y, this.lineWidth);
    if(hitInfo) {
      hitInfo.path = this;
      return hitInfo;
    }
  }

  return hitInfo;

}

} // block

