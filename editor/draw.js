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

  this.selectMode.drawSelectedPath(ctx);

}

self.prototype.drawUnselectedPath = function(ctx) {

  this.selectMode.drawUnselectedPath(ctx);

}

self.prototype.drawHandle = function(ctx) {

  this.selectMode.drawHandle(ctx);

}

self.prototype.drawNewPath = function(ctx) {

  if(!this.newPath) { return };

  this.newPath.draw(ctx);

}

} // block

