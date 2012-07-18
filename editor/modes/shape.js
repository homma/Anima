/**
 * @author Daisuke Homma
 */

new function() {  // block

an.ShapeCreatorMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

  this.name = "ShapeCreatorMode";

  this.shape = an.k.Rectangle;

}
var self = an.ShapeCreatorMode;

self.prototype = new an.EditorMode();

self.prototype.setShape = function(s) {

  this.shape = s;

}

self.prototype.drawShape = function(ctx, x, y, w, h) {

  var p = new an.Path();

  switch(this.shape) {

    case an.k.Rectangle:
      p.createRectangle(x, y, w, h);
      p.draw(ctx);
      break;

    case an.k.Oval:
      p.createOval(x, y, w, h);
      p.draw(ctx);
      break;

    case an.k.Circle:
      p.createCircle(x, y, w, h);
      p.draw(ctx);
      break;

    default:
      // do nothing

  }

}

self.prototype.createShape = function(x, y, w, h) {

  var p = new an.Path();

  switch(this.shape) {

    case an.k.Rectangle:
      p.createRectangle(x, y, w, h);
      break;

    case an.k.Oval:
      p.createOval(x, y, w, h);
      break;

    case an.k.Circle:
      p.createCircle(x, y, w, h);
      break;

    default:
      // do nothing

  }

  this.editor.addPath(p);

}

} // block
