/**
 * @fileOverview control object of action
 *   action: one time operation for selected paths
 * @author Daisuke Homma
 */

new function() { // block

an.PathAction = function() {

  an.g.PathAction = this;

}

var self = an.PathAction;

self.prototype.subdivide = function() {

  an.g.editor.subdivideSelectedPaths();
  an.g.editor.draw();

}

} // block
