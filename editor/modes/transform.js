/*
 * @author Daisuke Homma
 */

new function() {  // block

Anima.TransformMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

}
var self = Anima.TransformMode;

self.prototype = new Anima.EditorMode();

/// drwa ///////////////////////////////////////////////////////////////////////

self.prototype.drawHandle = function(ctx) {

  if( this.editor.selectedPathList.length == 0) { return; };

  for (var i = 0; i < this.editor.pathList.length; i++) {
    var path = this.editor.pathList[i];
    if(path.selected) {
      path.drawHandle(ctx);
    }
  }

}

/// hittest ////////////////////////////////////////////////////////////////////

self.prototype.isOnHandle = function(x, y) {

  var hitEdge = null;

  // guard
  if( this.editor.pathList.length == 0 ) { return hitEdge; };

  var ctx = this.editor.canvas.canvas.getContext('2d');

  for (var i = 0; i < this.editor.pathList.length; i++) {
    hitEdge = this.editor.pathList[i].isOnHandle(ctx, x, y);

    if(hitEdge) break;
  }

  return hitEdge;

}

// returns an edge if hit
self.prototype.isOnAnchorPoints = function(x, y) {

  var hitEdge = null;

  // guard
  if( this.editor.pathList.length == 0 ) { return hitEdge; };

  var ctx = this.editor.canvas.canvas.getContext('2d');

  for (var i = 0; i < this.editor.pathList.length; i++) {
    hitEdge = this.editor.pathList[i].isOnAnchorPoints(ctx, x, y);
    if(hitEdge) break;
  }

  return hitEdge;
}

} // block
