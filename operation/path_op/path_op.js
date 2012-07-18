/*
 * @author Daisuke Homma
 */

new function() { // block

an.PathOp = function() {

  new an.UIEvent();

  this.currentPathOp = null;

  this.setPathOp( an.g.CurveModifier );

  an.g.PathOp = this;

}
var self = an.PathOp;

/// path operations ////////////////////////////////////////////////////////////

self.prototype.setPathOp = function(ops) {

  if(this.currentPathOp) {
    this.currentPathOp.deselect();
  }

  this.currentPathOp = ops;

  ops.select();

}

self.prototype.getPathOp = function() {

  return this.currentPathOp;

}

self.prototype.selectPenHandler = function() {

  an.g.editor.deselectAll();
  an.g.editor.setEditorMode(an.g.editor.EditorModes.pen);
  this.setPathOp( an.g.PenHandler );
  an.g.editor.draw();

}

self.prototype.selectCurveCreator = function() {

  an.g.editor.deselectAll();
  an.g.editor.setEditorMode(an.g.editor.EditorModes.curve);
  this.setPathOp( an.g.CurveCreator );
  an.g.editor.draw();

}

self.prototype.selectShapeCreator = function(shape) {

  an.g.editor.deselectAll();
  an.g.editor.setEditorMode(an.g.editor.EditorModes.shape);
  an.g.editor.setShape(shape);
  this.setPathOp( an.g.ShapeCreator );
  an.g.editor.draw();

}

self.prototype.selectTransform = function() {

  an.g.editor.setEditorMode(an.g.editor.EditorModes.transform);
  this.setPathOp( an.g.CurveModifier );
  an.g.editor.draw();

}

self.prototype.selectResize = function() {

  an.g.editor.setEditorMode(an.g.editor.EditorModes.resize);
  this.setPathOp( an.g.PathResizer );
  an.g.editor.draw();

}

self.prototype.selectRotate = function() {

  an.g.editor.setEditorMode(an.g.editor.EditorModes.rotate);
  this.setPathOp( an.g.PathRotator );
  an.g.editor.draw();

}

self.prototype.selectConnect = function() {

  an.g.editor.setEditorMode(an.g.editor.EditorModes.connect);
  this.setPathOp( an.g.PathConnector );
  an.g.editor.draw();

}

self.prototype.selectPathSplit = function() {

  an.g.editor.setEditorMode(an.g.editor.EditorModes.pathSplit);
  this.setPathOp( an.g.PathSplitter );
  an.g.editor.draw();

}

self.prototype.selectPointRemove = function() {

  an.g.editor.setEditorMode( an.g.editor.EditorModes.pointRemove );
  this.setPathOp( an.g.PointRemover );
  an.g.editor.draw();

}

self.prototype.selectPointAdd = function() {

  an.g.editor.setEditorMode( an.g.editor.EditorModes.pointAdd );
  this.setPathOp( an.g.PointAdder );
  an.g.editor.draw();

}

} // block
