/*
 * @author Daisuke Homma
 */

// Path Inspector View

new function() { // block

var self = an.ColorStockView;

/// update parameters //////////////////////////////////////////////////////////

self.prototype.clear = function() {

  this.setStrokeColorAttrs(0, 0, 100, 1);  // lum == 100 => white
  this.setFillColorAttrs(0, 0, 100, 1);    // lum == 100 => white

}

self.prototype.updateColors = function(path) {

  // Stroke HSLA
  var shue = path.getStrokeColor().getHue();
  var ssat = path.getStrokeColor().getSaturation();
  var slum = path.getStrokeColor().getLuminance();
  var salp = path.getStrokeColor().getAlpha();

  this.setStrokeColorAttrs(shue, ssat, slum, salp);

  // Fill HSLA
  var fhue = path.getFillColor().getHue();
  var fsat = path.getFillColor().getSaturation();
  var flum = path.getFillColor().getLuminance();
  var falp = path.getFillColor().getAlpha();

  this.setFillColorAttrs(fhue, fsat, flum, falp);

}

} // block

