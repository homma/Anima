/**
 * @author Daisuke Homma
 */

new function() { // block

var self = an.ColorStockView;

self.prototype.register = function() {

  this.registerColorAttrs();
  this.registerStrokeColor();
  this.registerFillColor();
  this.registerColorStock();

}

// Color Attributes
self.prototype.registerColorAttrs = function() {

  var pathInspector = an.g.PathInspector;

  an.u.onClick( "path_stroke", pathInspector.setStroke );
  an.u.onClick( "path_fill", pathInspector.setFill );
  an.u.onClick( "path_both", pathInspector.setBoth );
  // necessary?
  // an.u.onClick( "path_same_color", pathInspector.setSameColor );

}

// Stroke Color
self.prototype.registerStrokeColor = function() {

  var pathInspector = an.g.PathInspector;

  an.u.onClick("stroke_hue_slider", pathInspector.setStrokeHue);
  an.u.onChange("stroke_hue_slider", pathInspector.setStrokeHue);
  an.u.onClick("stroke_sat_slider", pathInspector.setStrokeSaturation);
  an.u.onChange("stroke_sat_slider", pathInspector.setStrokeSaturation);
  an.u.onClick("stroke_lum_slider", pathInspector.setStrokeLuminance);
  an.u.onChange("stroke_lum_slider", pathInspector.setStrokeLuminance);
  an.u.onClick("stroke_alp_slider", pathInspector.setStrokeAlpha);
  an.u.onChange("stroke_alp_slider", pathInspector.setStrokeAlpha);

}

// Fill Color
self.prototype.registerFillColor = function() {

  var pathInspector = an.g.PathInspector;

  an.u.onClick(  "fill_hue_slider", pathInspector.setFillHue );
  an.u.onChange( "fill_hue_slider", pathInspector.setFillHue );
  an.u.onClick(  "fill_sat_slider", pathInspector.setFillSaturation );
  an.u.onChange( "fill_sat_slider", pathInspector.setFillSaturation );
  an.u.onClick(  "fill_lum_slider", pathInspector.setFillLuminance );
  an.u.onChange( "fill_lum_slider", pathInspector.setFillLuminance );
  an.u.onClick(  "fill_alp_slider", pathInspector.setFillAlpha );
  an.u.onChange( "fill_alp_slider", pathInspector.setFillAlpha );
}

// Color Stock
self.prototype.registerColorStock = function() {

  var cs = an.g.ColorStockView;

  an.u.onClick( "stroke_color",
                function() { cs.storeStrokeColorToColorStock(); } );
  an.u.onClick( "fill_color",
                function() { cs.storeFillColorToColorStock(); } );

  for(var i = 0; i < this.colorStock.MaxLength; i++) {
    an.u.onClick( "color_stock_" + i,
                  function(e) {
                    var id, n;
                    id = e.target.id;
                    n = parseInt( id.substring( "color_stock_".length ), 10 );
                    cs.selectColorStock(n);
                  } );
  }

  an.u.onClick( "set_stroke_color", function() { cs.setStrokeColor(); } );
  an.u.onClick( "set_fill_color", function() { cs.setFillColor(); } );

}

} // block
