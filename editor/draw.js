/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// draw ///////////////////////////////////////////////////////////////////////

self.prototype.draw = function() {

  this.canvas.clear();  // erase all the pathes before we draw

  var ctx = this.canvas.canvas.getContext('2d');

  this.drawUnselectedPath(ctx);
  this.drawSelectedPath(ctx);
  this.drawHandle(ctx);

  this.drawNewPath(ctx);
};

self.prototype.drawSelectedPath = function(ctx) {

  this.editorMode.drawSelectedPath(ctx);

}

self.prototype.drawUnselectedPath = function(ctx) {

  this.editorMode.drawUnselectedPath(ctx);

}

self.prototype.drawHandle = function(ctx) {

  this.editorMode.drawHandle(ctx);

}

self.prototype.drawNewPath = function(ctx) {

  if(!this.newPath) { return };
  this.editorMode.drawNewPath(ctx);

}

self.prototype.drawShape = function(x, y, w, h) {

  this.draw();

  var ctx = this.canvas.canvas.getContext('2d');
  this.editorMode.drawShape(ctx, x, y, w, h);

}

} // block

