/*
 * @author Daisuke Homma
 */

new function() {  // block

/// setter / getter ////////////////////////////////////////////////////////////

var self = an.Path;

var self = an.Path;

self.prototype.getBeginPoint = function() {

  var pt = this.edges[0].getAnchorPointZero();
  return pt;

}

self.prototype.getEndPoint = function() {

  var n = this.edges.length - 1;
  var pt = this.edges[n].getAnchorPointOne();
  return pt;

}

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

