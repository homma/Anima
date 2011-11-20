/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// transform //////////////////////////////////////////////////////////////////

self.prototype.modifyPoint = function(edge, x, y) {

  edge.setSelectedPoint(x, y);

}

self.prototype.removePoint = function(edge) {

  edge.removeSelectedPoint();

}

} // block

