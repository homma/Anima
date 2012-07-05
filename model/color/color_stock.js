/*
 * @author Daisuke Homma
 */

new function() { // block

an.ColorStock = function() {

  this.stock = [];
  this.selected = 0;
  this.MaxLength = 14;

  an.g.ColorStock = this;

}

var self = an.ColorStock;

self.prototype.storeColor = function(color) {

  for(var i = 0; i < this.stock.length; i++) {
    var stocked = this.stock[i];
    if( stocked.isSame(color) ) { return; }; // do nothing
  }

  if(this.stock.length == this.MaxLength) { this.stock.shift(); };
  this.stock.push(color);
  this.selectColorAt(this.stock.length - 1);

}

self.prototype.getColorAt = function(n) {
  if(this.stock.length != 0) {
    return this.stock[n];
  } else {
    return new an.Color();
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
