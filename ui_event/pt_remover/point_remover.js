/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.PointRemover = function() {

  Anima.Global.PointRemover = this;

};
var self = Anima.PointRemover;

// inherit from Anima.EventState;
self.prototype = new Anima.EventState();

self.prototype.select = function() {};

self.prototype.deselect = function() {

  Anima.Global.Selector.select();

};

self.prototype.removePoint = function() {

/*
  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  var diffX = x - this.prevX;
  var diffY = y - this.prevY;

  this.prevX = x;
  this.prevY = y;

  // var paths = Anima.Global.editor.getSelectedPaths();
  // for(var i = 0; i < paths.length; i++) {
  //   paths[i].translate(diffX, diffY);
  // }
  Anima.Global.editor.translateSelectedPaths(diffX, diffY);
*/

  Anima.Global.editor.draw();

};

} // block
