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

  an.u.onClick( "transform", op.selectTransform );
  an.u.onClick( "resize", op.selectResize );
  an.u.onClick( "rotate", op.selectRotate );
  an.u.onClick( "connect", op.selectConnect );
  an.u.onClick( "path_split", op.selectPathSplit );
  an.u.onClick( "remove_pt", op.selectPointRemove );
  an.u.onClick( "add_pt", op.selectPointAdd );

}

} // block
