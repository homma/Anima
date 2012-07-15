/*
 * @author Daisuke Homma
 */

new function() { // block

an.PathOp = function() {

  new an.PenHandler();
  new an.CurveCreator();

  new an.PathMover();
  new an.PathResizer();
  new an.PathRotator();
  new an.PointRemover();
  new an.PointAdder();
  new an.CurveModifier();
  new an.PathConnector();
  new an.PathSplitter();

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
  this.setPathOp( an.g.PenHandler );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.pen);
  an.g.editor.draw();

}

self.prototype.selectCurveCreator = function() {

  an.g.editor.deselectAll();
  this.setPathOp( an.g.CurveCreator );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.curve);
  an.g.editor.draw();

}

self.prototype.selectTransform = function() {

  this.setPathOp( an.g.CurveModifier );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.transform);
  an.g.editor.draw();

}

self.prototype.selectResize = function() {

  this.setPathOp( an.g.PathResizer );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.resize);
  an.g.editor.draw();

}

self.prototype.selectRotate = function() {

  this.setPathOp( an.g.PathRotator );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.rotate);
  an.g.editor.draw();

}

self.prototype.selectConnect = function() {

  // need fix.
  this.setPathOp( an.g.PathConnector );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.connect);
  an.g.editor.draw();

}

self.prototype.selectPathSplit = function() {

  // need fix.
  this.setPathOp( an.g.PathSplitter );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.pathSplit);
  an.g.editor.draw();

}

self.prototype.selectPointRemove = function() {

  this.setPathOp( an.g.PointRemover );
  an.g.editor.setEditorMode( an.g.editor.EditorModes.pointRemove );
  an.g.editor.draw();

}

self.prototype.selectPointAdd = function() {

  this.setPathOp( an.g.PointAdder );
  an.g.editor.setEditorMode( an.g.editor.EditorModes.pointAdd );
  an.g.editor.draw();

}

} // block
