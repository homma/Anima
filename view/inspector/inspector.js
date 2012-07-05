/*
 * @author Daisuke Homma
 */

// Path Inspector View

new function() { // block

an.PathInspectorView = function() {

  this.initPathInspectorView();

  an.g.pathInspectorView = this;

}
var self = an.PathInspectorView;

self.prototype.initPathInspectorView = function() {

  this.createObjects();
  this.registerHandler();
  this.clear();

}

self.prototype.createObjects = function() {

  new an.PathInspector();
  new an.ColorStock();

}

} // block
