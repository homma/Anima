/*
 * @author Daisuke Homma
 */

new function() {  // block

/// hittest ////////////////////////////////////////////////////////////////////

var self = Anima.Path;

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

    var cv = new Anima.Curve(p0.x, p0.y, p0.x, p0.y, p1.x, p1.y, p1.x, p1.y);
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
  if(!this.selected) return false;

  var hitEdge = false;

  for (var i = 0; this.edges.length > i; i++) {
    hitEdge = this.edges[i].isOnHandle(ctx, x, y, this.lineWidth);
    if(hitEdge) break;
  }

  return hitEdge;

}

self.prototype.isOnAnchorPoints = function(ctx, x, y) {
  if(!this.selected) return false;

  var hitEdge = false;

  for (var i = 0; this.edges.length > i; i++) {
    hitEdge = this.edges[i].isOnAnchorPoints(ctx, x, y, this.lineWidth);
    if(hitEdge) break;
  }

  return hitEdge;

}

} // block

