/*
 * @author Daisuke Homma
 */

new function() {  // block

an.PathSplitMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

  this.name = "PathSplitMode";

}
var self = an.PathSplitMode;

self.prototype = new an.EditorMode();

/// draw ///////////////////////////////////////////////////////////////////////

self.prototype.drawSelectedPath = function(ctx) {

  var arr = this.editor.pathList;

  for(var i = arr.length - 1; i >= 0 ; i--) {

    var path = arr[i];

    if(path.isSelected()) {
      path.drawEdge(ctx, 0, 0);
    }

  }

}

self.prototype.drawUnselectedPath = function(ctx) {

  var arr = this.editor.pathList;

  for(var i = arr.length - 1; i >= 0 ; i--) {

    var path = arr[i];

    if(!path.isSelected()) {
      path.drawWithAnchorPoints(ctx);
    }

  }

}

self.prototype.drawHandle = function(ctx) {

  if( this.editor.selectedPathList.length == 0) { return; };

  for (var i = 0; i < this.editor.pathList.length; i++) {
    var path = this.editor.pathList[i];
    if(path.selected) {
      path.drawAnchorPoints(ctx);
    }
  }

}

/// hittest ////////////////////////////////////////////////////////////////////

// returns hit inf or null
self.prototype.isOnAnchorPoints = function(x, y) {

  var hitInfo = null;

  // guard
  if( this.editor.pathList.length == 0 ) { return hitInfo; };

  var ctx = this.editor.canvas.canvas.getContext('2d');

  for (var i = 0; i < this.editor.pathList.length; i++) {
    hitInfo = this.editor.pathList[i].isOnAnchorPoints(ctx, x, y);
    if(hitInfo) break;
  }

  return hitInfo;
}

} // block
