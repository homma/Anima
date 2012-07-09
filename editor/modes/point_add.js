/*
 * @author Daisuke Homma
 */

new function() {  // block

an.PointAddMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

  this.name = "PointAddMode";

}
var self = an.PointAddMode;

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

} // block
