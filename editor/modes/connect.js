/*
 * @author Daisuke Homma
 */

new function() {  // block

Anima.ConnectMode = function(ed) {

  this.setEditor(ed);
  // this.editor = ed;

}
var self = Anima.ConnectMode;

self.prototype = new Anima.EditorMode();

self.prototype.drawSelectedPath = function(ctx) {

  if(this.editor.selectedPathList.length == 0) { return; }
  if(this.editor.selectedPathList.length > 1) {

    this.drawSelectedPathImpl(ctx);
    return;

  }

  var path = this.editor.selectedPathList[0];

  var conn = this.findConnection(path);
  if(conn) {
    path.drawWithDifference(ctx, conn.dx, conn.dy);
  } else {
    path.drawWithEndPoints(ctx);
  }

}

self.prototype.drawUnselectedPath = function(ctx) {

  var arr = this.editor.pathList;

  for(var i = arr.length - 1; i >= 0 ; i--) {

    var path = arr[i];

    if(!path.isSelected()) {
      path.drawWithEndPoints(ctx);
    }

  }

}

// returns { path: ..., dx: ..., dy: ... } object
self.prototype.findConnection = function(p) {

  var lst = this.editor.pathList;

  var p0 = p.getBeginPoint();
  var p1 = p.getEndPoint();

  var res = null;

  for(var i = 0; i < lst.length; i++) {

    if(p == lst[i]) { continue; }

    var t0 = lst[i].getBeginPoint();
    var t1 = lst[i].getEndPoint();

    res = this.isNearEnough(p0, t0);
    if(res) { break; }

    res = this.isNearEnough(p0, t1);
    if(res) { break; }

    res = this.isNearEnough(p1, t0);
    if(res) { break; }

    res = this.isNearEnough(p1, t1);
    if(res) { break; }

  }

  return res;

}

self.prototype.isNearEnough = function(p0, p1) {

  var res = null;

  var len = 10;  // 10pt

  var dx = p1.x - p0.x;
  var dy = p1.y - p0.y;
  var adx = Math.abs(dx);
  var ady = Math.abs(dy);

  if( (adx < len) && (ady < len) ) {
    res = { dx: dx, dy: dy };
  }

  return res;

}

} // block
