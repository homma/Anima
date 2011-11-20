/*
 * @author Daisuke Homma
 */

new function() {  // block

/// hittest ////////////////////////////////////////////////////////////////////

var self = Anima.Path;

self.prototype.hitTest = function(x, y) {

  var hitEdge = false;

  for (var i = 0; this.edges.length > i; i++) {
    hitEdge = this.edges[i].hitTest(x, y, this.lineWidth);
    if(hitEdge) break;
  }

  if(hitEdge) return hitEdge;

  // check closing edge if this.closePath == true
  if( this.getClosePath() ) {
    var p0 = this.getEndPoint();
    var p1 = this.getBeginPoint();

    var cv = new Anima.Curve(p0.x, p0.y, p0.x, p0.y, p1.x, p1.y, p1.x, p1.y);
    hitEdge = cv.hitTest(x, y, this.lineWidth);

  }

  return hitEdge;
}

self.prototype.hitTestHandle = function(x, y) {
  if(!this.selected) return false;

  var hitEdge = false;

  for (var i = 0; this.edges.length > i; i++) {
    hitEdge = this.edges[i].hitTestHandle(x, y);
    if(hitEdge) break;
  }

  return hitEdge;

}

self.prototype.hitTestAnchorPoint = function(x, y) {
  if(!this.selected) return false;

  var hitEdge = false;

  for (var i = 0; this.edges.length > i; i++) {
    hitEdge = this.edges[i].hitTestAnchorPoint(x, y);
    if(hitEdge) break;
  }

  return hitEdge;

}

} // block

