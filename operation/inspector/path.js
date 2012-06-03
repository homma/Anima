/*
 * @author Daisuke Homma
 */

new function() { // block

var self = Anima.PathInspector;
var gl = Anima.Global;

/// path operations ////////////////////////////////////////////////////////////

self.prototype.setPathOps = function(ops) {
  this.currentPathOps = ops;

  ops.select();

}

self.prototype.getPathOps = function() {
  return this.currentPathOps;
}

self.prototype.selectTransform = function() {

  gl.PathInspector.setPathOps( gl.CurveModifier );
  gl.editor.setSelectMode(gl.editor.SelectModes.transform);
  gl.editor.draw();

}

self.prototype.selectResize = function() {

  gl.PathInspector.setPathOps( gl.PathResizer );
  gl.editor.setSelectMode(gl.editor.SelectModes.resize);
  gl.editor.draw();

}

self.prototype.selectRotate = function() {

  gl.PathInspector.setPathOps( gl.PathRotator );
  gl.editor.setSelectMode(gl.editor.SelectModes.rotate);
  gl.editor.draw();

}

self.prototype.selectConnect = function() {

  // need fix.
  gl.PathInspector.setPathOps( gl.PathConnector );
  gl.editor.setSelectMode(gl.editor.SelectModes.connect);
  gl.editor.draw();

}

self.prototype.selectPointRemover = function() {

  gl.PathInspector.setPathOps( gl.PointRemover );
  gl.editor.setSelectMode( gl.editor.SelectModes.pointRemove );
  gl.editor.draw();

}

} // block
