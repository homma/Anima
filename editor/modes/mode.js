/*
 * @author Daisuke Homma
 */

new function() {  // block

Anima.EditorMode = function() {

  this.editor;

}
var self = Anima.EditorMode;

self.prototype.setEditor = function(ed) {

  this.editor = ed;

}

self.prototype.drawSelectedPath = function(ctx) {

  this.drawSelectedPathImpl(ctx);

}

self.prototype.drawSelectedPathImpl = function(ctx) {

  this.editor.pathList.forEach(function(path) {

    if(path.isSelected) {
      path.draw(ctx);
    }

  });

}

self.prototype.drawHandle = function(ctx) {

  // implemented in sub-class

}

self.prototype.isOnHandle = function(x, y) {

  // implemented in sub-class

}

} // block
