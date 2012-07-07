/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// transform //////////////////////////////////////////////////////////////////

self.prototype.modifyPoint = function(edge, x, y) {

  if(this.editorMode == this.EditorModes.connect) {
    // connect edges

  }
  edge.setSelectedPoint(x, y);

}

self.prototype.removePoint = function(edge) {

  edge.removeSelectedPoint();

}

} // block

