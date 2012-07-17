/**
 * @author Daisuke Homma
 */

new function() {  // block

an.RectangleCreatorMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

  this.name = "RectangleCreatorMode";

}
var self = an.RectangleCreatorMode;

self.prototype = new an.EditorMode();

} // block
