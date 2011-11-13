/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.PathInspector = function() {

  this.currentPathOps = null;

  this.createEventObjects();
  this.setPathOps( Anima.Global.CurveModifier );

  Anima.Global.PathInspector = this;

}
var self = Anima.PathInspector;

self.prototype.createEventObjects = function() {

  new Anima.PathMover();
  new Anima.PathResizer();
  new Anima.PathRotator();
  new Anima.PointRemover();
  new Anima.CurveModifier();

}

} // block

