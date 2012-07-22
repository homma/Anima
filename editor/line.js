/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// change line attribute //////////////////////////////////////////////////////

/**
 * @description set line width of a path
 * @param {Path} p a path to set line width
 * @param {Number} w width to set
 */
self.prototype.setLineWidthOfPath = function(p, w) {

  p.setLineWidth(w);

}

self.prototype.getLineWidthOfPath = function(p) {

  return p.getLineWidth();

}

self.prototype.setLineCapOfPath = function(p, style) {

  p.setLineCap(style);

}

self.prototype.getLineCapOfPath = function(p) {

  return p.getLineCap();

}

self.prototype.setLineJoinOfPath = function(p, style) {

  p.setLineJoin(style);

}

self.prototype.getLineJoinOfPath = function(p) {

  return p.getLineJoin();

}

self.prototype.setMiterLimitOfPath = function(p, n) {

  p.setMiterLimit(n);

}

self.prototype.getMiterLimitOfPath = function(p) {

  return p.getMiterLimit();

}

self.prototype.setClosePath = function(p, f) {

  p.setClosePath(f);

}

self.prototype.getClosePath = function(p) {

  return p.getClosePath();

}

self.prototype.setStroke = function(p, f) {

  p.setStroke(f);

}

self.prototype.getStroke = function(p) {

  return p.getStroke();

}

self.prototype.setFill = function(p, f) {

  p.setFill(f);

}

self.prototype.getFill = function(p) {

  return p.getFill();

}

/// color attributes ///////////////////////////////////////////////////////////
// stroke

self.prototype.setStrokeHueOfPath = function(p, v) {

  p.getStrokeColor().setHue(v);

}

self.prototype.getStrokeHueOfPath = function(p) {

  return p.getStrokeColor().getHue();

}

self.prototype.setStrokeSaturationOfPath = function(p, v) {

  p.getStrokeColor().setSaturation(v);

}

self.prototype.getStrokeSaturationOfPath = function(p) {

  return p.getStrokeColor().getSaturation();

}

self.prototype.setStrokeLuminanceOfPath = function(p, v) {

  p.getStrokeColor().setLuminance(v);

}

self.prototype.getStrokeLuminanceOfPath = function(p) {

  return p.getStrokeColor().getLuminance();

}

self.prototype.setStrokeAlphaOfPath = function(p, v) {

  p.getStrokeColor().setAlpha(v);

}

self.prototype.getStrokeAlphaOfPath = function(p) {

  return p.getStrokeColor().getAlpha();

}

/// color attributes ///////////////////////////////////////////////////////////
// fill

self.prototype.setFillHueOfPath = function(p, v) {

  p.getFillColor().setHue(v);

}

self.prototype.getFillHueOfPath = function(p) {

  return p.getFillColor().getHue();

}

self.prototype.setFillSaturationOfPath = function(p, v) {

  p.getFillColor().setSaturation(v);

}

self.prototype.getFillSaturationOfPath = function(p) {

  return p.getFillColor().getSaturation();

}

self.prototype.setFillLuminanceOfPath = function(p, v) {

  p.getFillColor().setLuminance(v);

}

self.prototype.getFillLuminanceOfPath = function(p) {

  return p.getFillColor().getLuminance();

}

self.prototype.setFillAlphaOfPath = function(p, v) {

  p.getFillColor().setAlpha(v);

}

self.prototype.getFillAlphaOfPath = function(p) {

  return p.getFillColor().getAlpha();

}




} // block
