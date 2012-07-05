/*
 * @author Daisuke Homma
 */

new function() {  // block

/// setter / getter ////////////////////////////////////////////////////////////

var self = an.Path;

self.prototype.setSelected = function(flag) {
  this.selected = flag;
}

self.prototype.isSelected = function() {
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

self.prototype.setStroke = function(flag) {
  this.stroke = flag;
}

self.prototype.getFill = function() {
  return this.fill;
}

self.prototype.setFill = function(flag) {
  this.fill = flag;
}

self.prototype.getStrokeColor = function() {
  return this.strokeColor;
}

self.prototype.getFillColor = function() {
  return this.fillColor;
}

}  // block

