/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.PathInspector;

/// path operations ////////////////////////////////////////////////////////////

self.prototype.setPathOps = function(ops) {
  this.currentPathOps = ops;

  ops.select();

}

self.prototype.getPathOps = function() {
  return this.currentPathOps;
}

self.prototype.selectTransform = function() {

  an.g.PathInspector.setPathOps( an.g.CurveModifier );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.transform);
  an.g.editor.draw();

}

self.prototype.selectResize = function() {

  an.g.PathInspector.setPathOps( an.g.PathResizer );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.resize);
  an.g.editor.draw();

}

self.prototype.selectRotate = function() {

  an.g.PathInspector.setPathOps( an.g.PathRotator );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.rotate);
  an.g.editor.draw();

}

self.prototype.selectConnect = function() {

  // need fix.
  an.g.PathInspector.setPathOps( an.g.PathConnector );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.connect);
  an.g.editor.draw();

}

self.prototype.selectPathSplit = function() {

  // need fix.
  an.g.PathInspector.setPathOps( an.g.PathSplitter );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.pathSplit);
  an.g.editor.draw();

}

self.prototype.selectPointRemove = function() {

  an.g.PathInspector.setPathOps( an.g.PointRemover );
  an.g.editor.setEditorMode( an.g.editor.EditorModes.pointRemove );
  an.g.editor.draw();

}

self.prototype.selectPointAdd = function() {

  an.g.PathInspector.setPathOps( an.g.PointAdder );
  an.g.editor.setEditorMode( an.g.editor.EditorModes.pointAdd );
  an.g.editor.draw();

}

} // block
