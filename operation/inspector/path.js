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
  an.g.editor.setSelectMode(an.g.editor.SelectModes.transform);
  an.g.editor.draw();

}

self.prototype.selectResize = function() {

  an.g.PathInspector.setPathOps( an.g.PathResizer );
  an.g.editor.setSelectMode(an.g.editor.SelectModes.resize);
  an.g.editor.draw();

}

self.prototype.selectRotate = function() {

  an.g.PathInspector.setPathOps( an.g.PathRotator );
  an.g.editor.setSelectMode(an.g.editor.SelectModes.rotate);
  an.g.editor.draw();

}

self.prototype.selectConnect = function() {

  // need fix.
  an.g.PathInspector.setPathOps( an.g.PathConnector );
  an.g.editor.setSelectMode(an.g.editor.SelectModes.connect);
  an.g.editor.draw();

}

self.prototype.selectPointRemover = function() {

  an.g.PathInspector.setPathOps( an.g.PointRemover );
  an.g.editor.setSelectMode( an.g.editor.SelectModes.pointRemove );
  an.g.editor.draw();

}

} // block
