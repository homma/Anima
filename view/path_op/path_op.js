/**
 * @author Daisuke Homma
 */

new function() { // block

an.PathOperationView = function() {

  this.register();

  an.g.PathOperationView = this;

}
var self = an.PathOperationView;

// bind an onclick function to an html element.
self.prototype.registerOnClick = function(id, fun) {

  var elem = document.getElementById(id);
  elem.onclick = fun;

}

self.prototype.register = function() {

  var op = an.g.PathOp;

  this.registerOnClick( "transform", op.selectTransform );
  this.registerOnClick( "resize", op.selectResize );
  this.registerOnClick( "rotate", op.selectRotate );
  this.registerOnClick( "connect", op.selectConnect );
  this.registerOnClick( "path_split", op.selectPathSplit );
  this.registerOnClick( "remove_pt", op.selectPointRemove );
  this.registerOnClick( "add_pt", op.selectPointAdd );

}

} // block
