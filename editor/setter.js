/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

self.prototype.setEditorMode = function(mode) {

  this.editorMode = mode;

}

/**
 * @description select a shape which is used in shape creator mode
 */
self.prototype.setShape = function(shape) {

  this.editorMode.setShape(shape);

}

/**
 * @description commit the past changes
 */
self.prototype.commit = function() {

  this.editorMode.commit();

}

} // block

