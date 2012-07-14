/*
 * @author Daisuke Homma
 */

new function() { // block

an.ColorStockView = function() {

  an.g.ColorStockView = this;

  this.colorStock = new an.ColorStock();
  this.register();

}
var self = an.ColorStockView;

/// color stock ////////////////////////////////////////////////////////////////

self.prototype.updateColorStock = function() {

  var n = this.colorStock.getSelectedNumber();
  var len = this.colorStock.size();

  for(var i = 0; i < len; i++) {
    var elem = document.getElementById( "color_stock_" + i );
    elem.style.background = this.colorStock.getColorAt(i).getColor();

    if(i == n) {
      elem.style.borderWidth = "2px";
    } else {
      elem.style.borderWidth = "1px";
    }
  }

}

} // block

