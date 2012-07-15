/**
 * @author Daisuke Homma
 */

new function() {  // block

an.PenMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

  this.name = "PenMode";

}
var self = an.PenMode;

self.prototype = new an.EditorMode();

self.prototype.drawNewPath = function(ctx) {

  this.editor.newPath.draw(ctx);

}

} // block
