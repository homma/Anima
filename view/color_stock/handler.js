/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.ColorStockView;

self.prototype.selectColorStock = function(n) {

  this.colorStock.selectColorAt(n);

  this.updateColorStock();

}

self.prototype.setStrokeColor = function() {

  var n = this.colorStock.getSelectedNumber();
  var color = this.colorStock.getColorAt(n);

  this.setStrokeColorAttrsFromColor(color);

  var ops = an.g.PathInspector;
  ops.setStrokeColorFromView();

}

self.prototype.setFillColor = function() {

  var n = this.colorStock.getSelectedNumber();
  var color = this.colorStock.getColorAt(n);

  this.setFillColorAttrsFromColor(color);

  var ops = an.g.PathInspector;
  ops.setFillColorFromView();

}

self.prototype.storeStrokeColorToColorStock = function() {

  var color = this.getStrokeColor();

  this.colorStock.storeColor(color);

  this.updateColorStock();

}

self.prototype.storeFillColorToColorStock = function() {

  var color = this.getFillColor();

  this.colorStock.storeColor(color);

  this.updateColorStock();

}

} // block

