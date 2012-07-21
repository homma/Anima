/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

self.prototype.setEditorMode = function(mode) {

  this.editorMode = mode;

}

self.prototype.getEditorMode = function() {

  return this.editorMode;

}

/**
 * @description select a shape which is used in shape creator mode
 */
self.prototype.setShape = function(shape) {

  this.editorMode.setShape(shape);

}

/**
 * @description get current shape of shape creator mode
 * @returns {Number} a shape in global/const.js
 */
self.prototype.getShape = function() {

  return this.editorMode.getShape();

}

/**
 * @description commit the past changes
 */
self.prototype.commit = function() {

  this.editorMode.commit();

}

} // block

