/*
 * @author Daisuke Homma
 */

// Path Inspector View

new function() { // block

var self = an.PathInspectorView;

/// color stock ////////////////////////////////////////////////////////////////

self.prototype.selectColorStock = function(e) {

  var colorStock = an.g.ColorStock;
  var id = e.target.id;
  var n = parseInt( id.substring( "color_stock_".length ), 10 );

  colorStock.selectColorAt(n);

  var inspector = an.g.pathInspectorView;
  inspector.updateColorStock();

}

self.prototype.updateColorStock = function() {

  var colorStock = an.g.ColorStock;
  var n = colorStock.getSelectedNumber();
  var len = colorStock.size();

  for(var i = 0; i < len; i++) {
    var elem = document.getElementById( "color_stock_" + i );
    elem.style.background = colorStock.getColorAt(i).getColor();

    if(i == n) {
      elem.style.borderWidth = "2px";
    } else {
      elem.style.borderWidth = "1px";
    }
  }

}

self.prototype.setStrokeColor = function(e) {

  var colorStock = an.g.ColorStock;
  var n = colorStock.getSelectedNumber();
  var color = colorStock.getColorAt(n);

  var view = an.g.pathInspectorView;
  view.setStrokeColorAttrsFromColor(color);

  var ops = an.g.PathInspector;
  ops.setStrokeColorFromView();

}

self.prototype.setFillColor = function(e) {

  var colorStock = an.g.ColorStock;
  var n = colorStock.getSelectedNumber();
  var color = colorStock.getColorAt(n);

  var view = an.g.pathInspectorView;
  view.setFillColorAttrsFromColor(color);

  var ops = an.g.PathInspector;
  ops.setFillColorFromView();

}

self.prototype.storeStrokeColorToColorStock = function(e) {

  var inspector = an.g.pathInspectorView;
  var color = inspector.getStrokeColor();

  var colorStock = an.g.ColorStock;
  colorStock.storeColor(color);

  inspector.updateColorStock();

}

self.prototype.storeFillColorToColorStock = function(e) {

  var inspector = an.g.pathInspectorView;
  var color = inspector.getFillColor();

  var colorStock = an.g.ColorStock;
  colorStock.storeColor(color);

  inspector.updateColorStock();

}

} // block

