/*
 * @author Daisuke Homma
 */

new function() {  // block

Anima.PointRemoveMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

}
var self = Anima.PointRemoveMode;

self.prototype = new Anima.EditorMode();

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
