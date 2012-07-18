/*
 * @author Daisuke Homma
 */

new function() {  // block

an.EditorMode = function() {

  this.editor;

}
var self = an.EditorMode;

self.prototype.setEditor = function(ed) {

  this.editor = ed;

}

self.prototype.commit = function() {

  // implemented in sub-class

}

self.prototype.drawSelectedPath = function(ctx) {

  this.drawSelectedPathImpl(ctx);

}

self.prototype.drawSelectedPathImpl = function(ctx) {

  var arr = this.editor.pathList;

  for(var i = arr.length - 1; i >= 0 ; i--) {

    var path = arr[i];

    if(path.isSelected()) {
      path.draw(ctx);
    }

  }

}

self.prototype.drawUnselectedPath = function(ctx) {

  var arr = this.editor.pathList;

  for(var i = arr.length - 1; i >= 0 ; i--) {

    var path = arr[i];

    if(!path.isSelected()) {
      path.draw(ctx);
    }

  }

}

self.prototype.drawHandle = function(ctx) {

  // implemented in sub-class

}

self.prototype.isOnHandle = function(x, y) {

  // implemented in sub-class

}

self.prototype.drawNewPath = function(ctx) {

  this.editor.newPath.draw(ctx);
  this.editor.newPath.drawHandles(ctx);

}

} // block
