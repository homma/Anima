/**
 * @author Daisuke Homma
 */

new function() { // block

an.PathOperationView = function() {

  this.register();

  an.g.PathOperationView = this;

}
var self = an.PathOperationView;

self.prototype.register = function() {

  var op = an.g.PathOp;

  an.u.onClick( "transform", function() { op.selectTransform(); } );
  an.u.onClick( "resize", function() { op.selectResize(); } );
  an.u.onClick( "rotate", function() { op.selectRotate(); } );
  an.u.onClick( "connect", function() { op.selectConnect(); } );
  an.u.onClick( "path_split", function() { op.selectPathSplit(); } );
  an.u.onClick( "remove_pt", function() { op.selectPointRemove(); } );
  an.u.onClick( "add_pt", function() { op.selectPointAdd(); } );

}

} // block
