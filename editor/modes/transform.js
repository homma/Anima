/*
 * @author Daisuke Homma
 */

new function() {  // block

an.TransformMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

  this.name = "TransformMode";

}
var self = an.TransformMode;

self.prototype = new an.EditorMode();

/// draw ///////////////////////////////////////////////////////////////////////

self.prototype.drawHandle = function(ctx) {

  if( this.editor.selectedPathList.length == 0) { return; };

  for (var i = 0; i < this.editor.pathList.length; i++) {
    var path = this.editor.pathList[i];
    if(path.selected) {
      path.drawHandles(ctx);
    }
  }

}

/// hittest ////////////////////////////////////////////////////////////////////

self.prototype.isOnHandle = function(x, y) {

  var hitInfo = null;

  // guard
  if( this.editor.selectedPathList.length == 0 ) { return hitInfo; };

  var ctx = this.editor.canvas.canvas.getContext('2d');

  for (var i = 0; i < this.editor.selectedPathList.length; i++) {
    hitInfo = this.editor.selectedPathList[i].isOnHandle(ctx, x, y);

    if(hitInfo) break;
  }

  return hitInfo;

}

// returns an edge if hit
self.prototype.isOnAnchorPoints = function(x, y) {

  var hitInfo = null;

  // guard
  if( this.editor.selectedPathList.length == 0 ) { return hitInfo; };

  var ctx = this.editor.canvas.canvas.getContext('2d');

  for (var i = 0; i < this.editor.selectedPathList.length; i++) {
    hitInfo = this.editor.pathList[i].isOnAnchorPoints(ctx, x, y);
    if(hitInfo) break;
  }

  return hitInfo;
}

} // block
