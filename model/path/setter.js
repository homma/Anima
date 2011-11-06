/*
 * @author Daisuke Homma
 */

new function() {  // block

/// setter / getter ////////////////////////////////////////////////////////////

var self = Anima.Path;

self.prototype.setSelected = function(flag) {
  this.selected = flag;
}

self.prototype.getSelected = function() {
  return this.selected;
}

self.prototype.setClosePath = function(flag) {
  this.closePath = flag;
}

self.prototype.getClosePath = function() {
  return this.closePath;
}

self.prototype.getStroke = function() {
  return this.stroke;
}

self.prototype.setStroke = function(f) {
  this.stroke = f;
}

self.prototype.getFill = function() {
  return this.fill;
}

self.prototype.setFill = function(f) {
  this.fill = f;
}

/// set / get color ////////////////////////////////////////////////////////////

self.prototype.updateStrokeColor = function() {
  this.strokeHSLA = "hsla(" + this.strokeH + "," + this.strokeS + "%," +
                   this.strokeL + "%," + this.strokeA + ")";
}

self.prototype.updateFillColor = function() {
  this.fillHSLA = "hsla(" + this.fillH + "," + this.fillS + "%," +
                   this.fillL + "%," + this.fillA + ")";
}

self.prototype.getStrokeHue = function() {
  return this.strokeH;
}

self.prototype.setStrokeHue = function(h) {
  this.strokeH = h;
  this.updateStrokeColor();
}

self.prototype.getStrokeSaturation = function() {
  return this.strokeS;
}

self.prototype.setStrokeSaturation = function(s) {
  this.strokeS = s;
  this.updateStrokeColor();
}

self.prototype.getStrokeLuminance = function() {
  return this.strokeL;
}

self.prototype.setStrokeLuminance = function(l) {
  this.strokeL = l;
  this.updateStrokeColor();
}

self.prototype.getStrokeAlpha = function() {
  return this.strokeA;
}

self.prototype.setStrokeAlpha = function(a) {
  this.strokeA = a;
  this.updateStrokeColor();
}

self.prototype.getFillHue = function() {
  return this.fillH;
}

self.prototype.setFillHue = function(h) {
  this.fillH = h;
  this.updateFillColor();
}

self.prototype.getFillSaturation = function() {
  return this.fillS;
}

self.prototype.setFillSaturation = function(s) {
  this.fillS = s;
  this.updateFillColor();
}

self.prototype.getFillLuminance = function() {
  return this.fillL;
}

self.prototype.setFillLuminance = function(l) {
  this.fillL = l;
  this.updateFillColor();
}

self.prototype.getFillAlpha = function() {
  return this.fillA;
}

self.prototype.setFillAlpha = function(a) {
  this.fillA = a;
  this.updateFillColor();
}

}  // block

