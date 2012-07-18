/**
 * @fileOverview shape creator
 * @author Daisuke Homma
 */

new function() {  // block

an.ShapeCreator = function() {

  an.g.ShapeCreator = this;

  this.on;
  this.x;
  this.y;
  this.width;
  this.height;

  this.initialize();

}

var self = an.ShapeCreator;

// inherit from an.EventState
self.prototype = new an.EventState();

self.prototype.initialize = function() {

  this.on = false;
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;

  an.g.editor.deselectAll();

}

self.prototype.select = function() {

  an.g.editor.setEditorMode(an.g.editor.EditorModes.shape);
  this.selectSelf();

}

self.prototype.deselect = function() {

  this.initialize();
  this.deselectSelf();

}

self.prototype.onMouseDown = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  this.x = position.x;
  this.y = position.y;
  this.width = 0;
  this.height = 0;

  this.on = true;

}

self.prototype.onMouseMove = function(e) {

  if( !this.on ) { return; }

  var position = an.u.getMousePositionInCanvas(e);
  this.width = position.x - this.x;
  this.height = position.y - this.y;

  an.g.editor.drawShape(this.x, this.y, this.width, this.height);

}

self.prototype.onMouseUp = function(e) {

  if( !this.on ) { return; }

  var position = an.u.getMousePositionInCanvas(e);
  this.width = position.x - this.x;
  this.height = position.y - this.y;

  an.g.editor.createShape(this.x, this.y, this.width, this.height);

  this.initialize();
  an.g.editor.draw();

}

} // block
