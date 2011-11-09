/*
 * @author Daisuke Homma
 */

// Path Inspector View

new function() { // block

Anima.PathInspectorView = function() {

  this.initPathInspectorView();

  Anima.Global.pathInspectorView = this;

}
var self = Anima.PathInspectorView;

self.prototype.initPathInspectorView = function() {

  this.createObjects();
  this.registerHandler();
  this.clear();

}

self.prototype.createObjects = function() {

  new Anima.PathInspector();
  new Anima.ColorStock();

}

} // block
