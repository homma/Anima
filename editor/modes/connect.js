/*
 * @author Daisuke Homma
 */

new function() {  // block

an.ConnectMode = function(ed) {

  this.setEditor(ed);
  // this.editor = ed;

  this.name = "ConnectMode";

}
var self = an.ConnectMode;

self.prototype = new an.EditorMode();

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

self.prototype.connectPathIfPossible = function() {

  var path = this.editor.selectedPathList[0];

  var conn = this.findConnection(path);
  if(conn) {
    // connect paths
    an.g.editor.connectPaths(conn.from, conn.head, conn.to, conn.toHead);
  }
}

// returns
//{   from: from path,  // source path (moving)
//    head: boolean,    // connect head (of source path to target path)
//      to: to path,    // target path (not moving, fixed position)
//  toHead: boolean,    // connect to head or not
//      dx: diff x,     // x diff from source path to target path
//      dy: diff y }
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
    if(res) {
      res.from = p;
      res.to = lst[i];
      res.head = true;
      res.toHead = true;
      break;
    }

    res = this.isNearEnough(p0, t1);
    if(res) {
      res.from = p;
      res.to = lst[i];
      res.head = true;
      res.toHead = false;
      break;
    }

    res = this.isNearEnough(p1, t0);
    if(res) {
      res.from = p;
      res.to = lst[i];
      res.head = false;
      res.toHead = true;
      break;
    }

    res = this.isNearEnough(p1, t1);
    if(res) {
      res.from = p;
      res.to = lst[i];
      res.head = false;
      res.toHead = false;
      break;
    }

  }

  return res;

}

// isNearEnough(fromPath, toPath)
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
