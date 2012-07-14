/*
 * @author Daisuke Homma
 */

new function() { // block

an.PathOp = function() {

  new an.PathMover();
  new an.PathResizer();
  new an.PathRotator();
  new an.PointRemover();
  new an.PointAdder();
  new an.CurveModifier();
  new an.PathConnector();
  new an.PathSplitter();

  this.currentPathOps = null;

  this.setPathOps( an.g.CurveModifier );

  an.g.PathOp = this;

}
var self = an.PathOp;

/// path operations ////////////////////////////////////////////////////////////

self.prototype.setPathOps = function(ops) {

  this.currentPathOps = ops;

  ops.select();

}

self.prototype.getPathOps = function() {

  return this.currentPathOps;

}

self.prototype.selectTransform = function() {

  this.setPathOps( an.g.CurveModifier );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.transform);
  an.g.editor.draw();

}

self.prototype.selectResize = function() {

  this.setPathOps( an.g.PathResizer );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.resize);
  an.g.editor.draw();

}

self.prototype.selectRotate = function() {

  this.setPathOps( an.g.PathRotator );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.rotate);
  an.g.editor.draw();

}

self.prototype.selectConnect = function() {

  // need fix.
  this.setPathOps( an.g.PathConnector );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.connect);
  an.g.editor.draw();

}

self.prototype.selectPathSplit = function() {

  // need fix.
  this.setPathOps( an.g.PathSplitter );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.pathSplit);
  an.g.editor.draw();

}

self.prototype.selectPointRemove = function() {

  this.setPathOps( an.g.PointRemover );
  an.g.editor.setEditorMode( an.g.editor.EditorModes.pointRemove );
  an.g.editor.draw();

}

self.prototype.selectPointAdd = function() {

  this.setPathOps( an.g.PointAdder );
  an.g.editor.setEditorMode( an.g.editor.EditorModes.pointAdd );
  an.g.editor.draw();

}

} // block
