/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.PathOp;

self.prototype.selectTransform = function() {

  var op = an.g.PathOp;

  op.setPathOps( an.g.CurveModifier );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.transform);
  an.g.editor.draw();

}

self.prototype.selectResize = function() {

  var op = an.g.PathOp;

  op.setPathOps( an.g.PathResizer );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.resize);
  an.g.editor.draw();

}

self.prototype.selectRotate = function() {

  var op = an.g.PathOp;

  op.setPathOps( an.g.PathRotator );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.rotate);
  an.g.editor.draw();

}

self.prototype.selectConnect = function() {

  var op = an.g.PathOp;

  op.setPathOps( an.g.PathConnector );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.connect);
  an.g.editor.draw();

}

self.prototype.selectPathSplit = function() {

  var op = an.g.PathOp;

  op.setPathOps( an.g.PathSplitter );
  an.g.editor.setEditorMode(an.g.editor.EditorModes.pathSplit);
  an.g.editor.draw();

}

self.prototype.selectPointRemove = function() {

  var op = an.g.PathOp;

  op.setPathOps( an.g.PointRemover );
  an.g.editor.setEditorMode( an.g.editor.EditorModes.pointRemove );
  an.g.editor.draw();

}

self.prototype.selectPointAdd = function() {

  var op = an.g.PathOp;

  op.setPathOps( an.g.PointAdder );
  an.g.editor.setEditorMode( an.g.editor.EditorModes.pointAdd );
  an.g.editor.draw();

}

} // block
