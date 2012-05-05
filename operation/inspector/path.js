/*
 * @author Daisuke Homma
 */

new function() { // block

var self = Anima.PathInspector;

/// path operations ////////////////////////////////////////////////////////////

self.prototype.setPathOps = function(ops) {
  this.currentPathOps = ops;
}

self.prototype.getPathOps = function() {
  return this.currentPathOps;
}

self.prototype.selectTransform = function() {

  Anima.Global.PathInspector.setPathOps( Anima.Global.CurveModifier );
  Anima.Global.editor.setSelectMode(Anima.Global.editor.SelectModes.transform);
  Anima.Global.editor.draw();

}

self.prototype.selectResize = function() {

  Anima.Global.PathInspector.setPathOps( Anima.Global.PathResizer );
  Anima.Global.editor.setSelectMode(Anima.Global.editor.SelectModes.resize);
  Anima.Global.editor.draw();

}

self.prototype.selectRotate = function() {

  Anima.Global.PathInspector.setPathOps( Anima.Global.PathRotator );
  Anima.Global.editor.setSelectMode(Anima.Global.editor.SelectModes.rotate);
  Anima.Global.editor.draw();

}

self.prototype.selectConnect = function() {

  // need fix.
  Anima.Global.PathInspector.setPathOps( Anima.Global.CurveModifier );
  Anima.Global.editor.setSelectMode(Anima.Global.editor.SelectModes.connect);
  Anima.Global.editor.draw();

}

self.prototype.selectPointRemover = function() {

  Anima.Global.PathInspector.setPathOps( Anima.Global.PointRemover );
  Anima.Global.editor.setSelectMode(Anima.Global.editor.SelectModes.transform);
  Anima.Global.editor.draw();

}

} // block
