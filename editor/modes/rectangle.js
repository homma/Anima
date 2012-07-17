/**
 * @author Daisuke Homma
 */

new function() {  // block

an.RectangleCreatorMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

  this.name = "RectangleCreatorMode";

}
var self = an.RectangleCreatorMode;

self.prototype = new an.EditorMode();

self.prototype.drawShape = function(ctx, x, y, w, h) {

  // To be fixed
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = 'lightGray';
  ctx.strokeRect(x, y, w, h);

}

self.prototype.createShape = function(x, y, w, h) {

  var p = new an.Path();
  p.createRectangle(x, y, h, w);
  this.editor.addPath(p);

}

} // block
