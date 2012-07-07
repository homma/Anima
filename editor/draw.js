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
  // console.log(this.editorMode);
  // console.log("editor#drawHandle");

}

self.prototype.drawNewPath = function(ctx) {

  if(!this.newPath) { return };

  this.newPath.draw(ctx);
  this.newPath.drawHandles(ctx);

}

} // block

