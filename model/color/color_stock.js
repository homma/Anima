/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.ColorStock = function() {

  this.stock = [];
  this.selected = 0;
  this.MaxLength = 14;

  Anima.Global.ColorStock = this;

}

var self = Anima.ColorStock;

self.prototype.storeColor = function(color) {

  if(this.stock.length == this.MaxLength) { this.stock.shift(); };
  this.stock.push(color);

}

self.prototype.getColorAt = function(n) {
  if(this.stock.length != 0) {
    return this.stock[n];
  } else {
    return new Anima.Color();
  }
}

self.prototype.selectColorAt = function(n) {
  if(n < this.stock.length) {
    this.selected = n;
  }
}

self.prototype.size = function() {
  return this.stock.length;
}

self.prototype.getSelectedNumber = function() {
  return this.selected;
}

self.prototype.export = function(indent) {

  // type = "colorStock"

}

self.prototype.import = function(obj) {

  if(obj.type != "colorStock") return; // not a color object

}

} // block