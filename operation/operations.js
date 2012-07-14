/*
 * @author Daisuke Homma
 */

// Global Operations

new function() {  // block

an.Operations = function() {

  this.initialize();

  an.g.Operations = this;

};
self = an.Operations;

self.prototype.initialize = function() {

  new an.PathInspector();
  new an.PathOp();
  new an.GlobalAction();
  new an.PathAction();

}

} // block end
