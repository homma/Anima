/*
 * @author Daisuke Homma
 */

new function() {  // block

/// parameters /////////////////////////////////////////////////////////////////

var self = an.Path;

self.prototype.getLineWidth = function(w) {
  return this.lineWidth;
}

self.prototype.getLineCap = function() {
  return this.lineCap;
}

self.prototype.getLineJoin = function() {
  return this.lineJoin;
}

self.prototype.getMiterLimit = function() {
  return this.miterLimit;
}

self.prototype.setLineWidth = function(w) {
  this.lineWidth = w;
}

self.prototype.setLineCap = function(style) {
  this.lineCap = style;  // butt / round / square
}

self.prototype.setLineJoin = function(style) {
  this.lineJoin = style;  // bevel / round / miter
}

self.prototype.setMiterLimit = function(limit) {
  this.miterLimit = limit;  // > 0
}

/// transform //////////////////////////////////////////////////////////////////

self.prototype.translate = function(x, y) {

  if( an.g.undoManager.shouldRegister(this, this.moveTo) ) {
    var pt = this.getBeginPoint();
    an.g.undoManager.registerUndo(this, this.moveTo, [pt.x, pt.y]);
  }

  for(var i = 0; i < this.edges.length; i++) {
    this.edges[i].translate(x, y);
  }
}

self.prototype.moveTo = function(x, y) {

  var pt = this.getBeginPoint();
  this.translate(x - pt.x, y - pt.y);

}

/// resize /////////////////////////////////////////////////////////////////////

/**
 * @description resize selected paths
 * @param {Number} fromX x coordinate of the origin of scale
 * @param {Number} fromY y coordinate of the origin of scale
 * @param {Number} scaleX horisontal scale factor
 * @param {Number} scaleY vertical scale factor
 */
self.prototype.resize = function(fromX, fromY, scaleX, scaleY) {

  for(var i = 0; i < this.edges.length; i++) {
    this.edges[i].resize(fromX, fromY, scaleX, scaleY);
  }

}

/**
 * @description scale selected paths
 * not yet implemented
 * @param {Number} x scaling factor of width
 * @param {Number} y scaling factor of height
 */
self.prototype.scale = function(x, y) {
  for(var i = 0; i < this.edges.length; i++) {
    this.edges[i].scale(x, y);
  }
}


/// rotate /////////////////////////////////////////////////////////////////////

/**
 * @description rotate path
 * @param {Number} x x coordinate of the center of rotation
 * @param {Number} y y coordinate of the center of rotation
 * @param {Number} r angle of rotation
 */
self.prototype.rotate = function(x, y, r) {

  for(var i = 0; i < this.edges.length; i++) {

    var e = this.edges[i];
    e.rotate(x, y, r);
    e.stickToPrev();

  }

}

}  // block

