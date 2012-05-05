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

  if(this.selectedPathList.length = 0) { return; }
  if(this.selectedPathList.length > 1) {

    self.drawSelectedPathImpl(ctx);
    return;

  }

  var path = this.editor.selectedPathList[0];

  var conn = this.findConnection(path);
  if(conn) {
    path.drawWithDifference(ctx, conn.dx, conn.dy);
  }

}

// returns { path: ..., dx: ..., dy: ... } object
self.prototype.findConnection = function(p) {

  var path;  // a path which is connectable



}

} // block
