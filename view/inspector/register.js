/*
 * @author Daisuke Homma
 */

// Path Inspector View

new function() { // block

var self = Anima.PathInspectorView;

self.prototype.registerHandler = function() {

  this.registerSwitcher();
  this.registerLineAttrs();
  this.registerColorAttrs();
  this.registerStrokeColor();
  this.registerFillColor();
  this.registerColorStock();
  this.registerPathOps();

}

// bind an onclick function to an html element.
self.prototype.registerOnClick = function(id, fun) {
  // console.log(id);
  var elem = document.getElementById(id);
  // console.log(elem);
  elem.onclick = fun;
}

// bind an onchange function to an html element.
self.prototype.registerOnChange = function(id, fun) {
  var elem = document.getElementById(id);
  elem.onchange = fun;
}

// Attribtes / Operations switcher
self.prototype.registerSwitcher = function() {

  this.registerOnClick( "path_attrs_sw", this.showPathAttributes );
  this.registerOnClick( "path_ops_sw", this.showPathOperations);

}

// Line Attributes
self.prototype.registerLineAttrs = function() {
  var pathInspector = Anima.Global.PathInspector;

  this.registerOnClick( "line_width", pathInspector.changeLineWidth );
  this.registerOnChange( "line_width", pathInspector.changeLineWidth );

  this.registerOnClick( "line_cap", this.changeLineCap );
  this.registerOnChange( "line_cap", this.changeLineCap );
  this.registerOnClick( "line_join", this.changeLineJoin );
  this.registerOnChange( "line_join", this.changeLineJoin );
  this.registerOnClick( "miter_limit", pathInspector.changeMiterLimit );
  this.registerOnChange( "miter_limit", pathInspector.changeMiterLimit );

  this.registerOnClick( "close_path", pathInspector.setClosePath );
  this.registerOnChange( "close_path", pathInspector.setClosePath );
}

// Color Attributes
self.prototype.registerColorAttrs = function() {
  var pathInspector = Anima.Global.PathInspector;

  this.registerOnClick( "path_stroke", pathInspector.setStroke );
  this.registerOnClick( "path_fill", pathInspector.setFill );
  this.registerOnClick( "path_both", pathInspector.setBoth );
  // necessary?
  // this.registerOnClick( "path_same_color", pathInspector.setSameColor );

}

// Stroke Color
self.prototype.registerStrokeColor = function() {
  var pathInspector = Anima.Global.PathInspector;

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
  var pathInspector = Anima.Global.PathInspector;

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
  var pathInspector = Anima.Global.PathInspector;
  var colorStock = Anima.Global.ColorStock;

  this.registerOnClick( "stroke_color", this.storeStrokeColorToColorStock );
  this.registerOnClick( "fill_color", this.storeFillColorToColorStock );

  for(var i = 0; i < colorStock.MaxLength; i++) {
    this.registerOnClick( "color_stock_" + i, this.selectColorStock );
  }

  this.registerOnClick( "set_stroke_color", this.setStrokeColor );
  this.registerOnClick( "set_fill_color", this.setFillColor );

}

// Path Operations
self.prototype.registerPathOps = function() {
  var pathInspector = Anima.Global.PathInspector;

  this.registerOnClick(  "transform", pathInspector.selectTransform );
  this.registerOnClick(  "resize", pathInspector.selectResize );
  this.registerOnClick(  "rotate", pathInspector.selectRotate );
  this.registerOnClick(  "remove_pt", pathInspector.selectPointRemover );

}

} // block

