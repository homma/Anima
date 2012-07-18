/*
 * @fileOverview user interface event handler manager
 * @author Daisuke Homma
 */

new function() { // block

an.UIEvent = function() {

  an.g.UIEvent = this;

  this.createObjects();

};
var self = an.UIEvent;

self.prototype.createObjects = function() {

  // Data Creator
  new an.PenHandler();
  new an.CurveCreator();
  new an.ShapeCreator();

  // Data Modifier
  new an.PathMover();
  new an.PathResizer();
  new an.PathRotator();
  new an.PointRemover();
  new an.PointAdder();
  new an.CurveModifier();
  new an.PathConnector();
  new an.PathSplitter();

}

} // block
