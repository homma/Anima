/**
 * @author Daisuke Homma
 */

new function() { // block

var self = an.ColorStockView;

// bind an onclick function to an html element.
self.prototype.registerOnClick = function(id, fun) {

  var elem = document.getElementById(id);
  elem.onclick = fun;

}

// bind an onchange function to an html element.
self.prototype.registerOnChange = function(id, fun) {

  var elem = document.getElementById(id);
  elem.onchange = fun;

}

self.prototype.register = function() {

  this.registerColorAttrs();
  this.registerStrokeColor();
  this.registerFillColor();
  this.registerColorStock();

}

// Color Attributes
self.prototype.registerColorAttrs = function() {

  var pathInspector = an.g.PathInspector;

  this.registerOnClick( "path_stroke", pathInspector.setStroke );
  this.registerOnClick( "path_fill", pathInspector.setFill );
  this.registerOnClick( "path_both", pathInspector.setBoth );
  // necessary?
  // this.registerOnClick( "path_same_color", pathInspector.setSameColor );

}

// Stroke Color
self.prototype.registerStrokeColor = function() {

  var pathInspector = an.g.PathInspector;

  this.registerOnClick("stroke_hue_slider", pathInspector.setStrokeHue);
  this.registerOnChange("stroke_hue_slider", pathInspector.setStrokeHue);
  this.registerOnClick("stroke_sat_slider", pathInspector.setStrokeSaturation);
  this.registerOnChange("stroke_sat_slider", pathInspector.setStrokeSaturation);
  this.registerOnClick("stroke_lum_slider", pathInspector.setStrokeLuminance);
  this.registerOnChange("stroke_lum_slider", pathInspector.setStrokeLuminance);
  this.registerOnClick("stroke_alp_slider", pathInspector.setStrokeAlpha);
  this.registerOnChange("stroke_alp_slider", pathInspector.setStrokeAlpha);

}

// Fill Color
self.prototype.registerFillColor = function() {

  var pathInspector = an.g.PathInspector;

  this.registerOnClick(  "fill_hue_slider", pathInspector.setFillHue );
  this.registerOnChange( "fill_hue_slider", pathInspector.setFillHue );
  this.registerOnClick(  "fill_sat_slider", pathInspector.setFillSaturation );
  this.registerOnChange( "fill_sat_slider", pathInspector.setFillSaturation );
  this.registerOnClick(  "fill_lum_slider", pathInspector.setFillLuminance );
  this.registerOnChange( "fill_lum_slider", pathInspector.setFillLuminance );
  this.registerOnClick(  "fill_alp_slider", pathInspector.setFillAlpha );
  this.registerOnChange( "fill_alp_slider", pathInspector.setFillAlpha );
}

// Color Stock
self.prototype.registerColorStock = function() {

  var cs = an.g.ColorStockView;

  this.registerOnClick( "stroke_color", cs.storeStrokeColorToColorStock );
  this.registerOnClick( "fill_color", cs.storeFillColorToColorStock );

  for(var i = 0; i < this.colorStock.MaxLength; i++) {
    this.registerOnClick( "color_stock_" + i, cs.selectColorStock );
  }

  this.registerOnClick( "set_stroke_color", cs.setStrokeColor );
  this.registerOnClick( "set_fill_color", cs.setFillColor );

}

} // block
