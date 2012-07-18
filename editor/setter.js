/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

self.prototype.setEditorMode = function(mode) {

  this.editorMode = mode;

}

self.prototype.setShape = function(shape) {

  this.editorMode.setShape(shape);

}

} // block

