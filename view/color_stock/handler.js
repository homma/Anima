/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.ColorStockView;

self.prototype.selectColorStock = function(e) {

  var csv = an.g.ColorStockView;

  var id = e.target.id;
  var n = parseInt( id.substring( "color_stock_".length ), 10 );

  csv.colorStock.selectColorAt(n);

  csv.updateColorStock();

}

self.prototype.setStrokeColor = function(e) {

  var csv = an.g.ColorStockView;

  var n = csv.colorStock.getSelectedNumber();
  var color = csv.colorStock.getColorAt(n);

  csv.setStrokeColorAttrsFromColor(color);

  var ops = an.g.PathInspector;
  ops.setStrokeColorFromView();

}

self.prototype.setFillColor = function(e) {

  var csv = an.g.ColorStockView;

  var n = csv.colorStock.getSelectedNumber();
  var color = csv.colorStock.getColorAt(n);

  csv.setFillColorAttrsFromColor(color);

  var ops = an.g.PathInspector;
  ops.setFillColorFromView();

}

self.prototype.storeStrokeColorToColorStock = function(e) {

  var csv = an.g.ColorStockView;

  var color = csv.getStrokeColor();

  csv.colorStock.storeColor(color);

  csv.updateColorStock();

}

self.prototype.storeFillColorToColorStock = function(e) {

  var csv = an.g.ColorStockView;

  var color = csv.getFillColor();

  csv.colorStock.storeColor(color);

  csv.updateColorStock();

}

} // block

