/*
 * @author Daisuke Homma
 */

// Path Inspector View

new function() { // block

Anima.PathInspectorView = function() {

  new Anima.PathInspector();
  this.initPathInspectorView();

  Anima.Global.pathInspectorView = this;

}
var self = Anima.PathInspectorView;

self.prototype.initPathInspectorView = function() {

  this.registerHandler();
  this.clear();

}

self.prototype.registerHandler = function() {

  var pathInspector = Anima.Global.PathInspector;

  // assign an onclick function to an html element.
  var registerOnClick = function(id, fun) {
    var elem = document.getElementById(id);
    elem.onclick = fun;
  }

  // assign an onchange function to an html element.
  var registerOnChange = function(id, fun) {
    var elem = document.getElementById(id);
    elem.onchange = fun;
  }

  // Path Attributes
  registerOnClick( "line_width", pathInspector.changeLineWidth );
  registerOnChange( "line_width", pathInspector.changeLineWidth );

  registerOnClick( "line_cap", this.changeLineCap );
  registerOnChange( "line_cap", this.changeLineCap );
  registerOnClick( "line_join", this.changeLineJoin );
  registerOnChange( "line_join", this.changeLineJoin );
  registerOnClick( "miter_limit", pathInspector.changeMiterLimit );
  registerOnChange( "miter_limit", pathInspector.changeMiterLimit );

  registerOnClick( "close_path", pathInspector.setClosePath );
  registerOnChange( "close_path", pathInspector.setClosePath );

  // Color Attributes
  registerOnClick( "path_stroke", pathInspector.setStroke );
  registerOnClick( "path_fill", pathInspector.setFill );
  registerOnClick( "path_both", pathInspector.setBoth );
  // necessary?
  // registerOnClick( "path_same_color", pathInspector.setSameColor );

  // Stroke Color
  registerOnClick(  "stroke_hue_slider", pathInspector.setStrokeHue );
  registerOnChange( "stroke_hue_slider", pathInspector.setStrokeHue );
  registerOnClick(  "stroke_sat_slider", pathInspector.setStrokeSaturation );
  registerOnChange( "stroke_sat_slider", pathInspector.setStrokeSaturation );
  registerOnClick(  "stroke_lum_slider", pathInspector.setStrokeLuminance );
  registerOnChange( "stroke_lum_slider", pathInspector.setStrokeLuminance );
  registerOnClick(  "stroke_alp_slider", pathInspector.setStrokeAlpha );
  registerOnChange( "stroke_alp_slider", pathInspector.setStrokeAlpha );

  // Fill Color
  registerOnClick(  "fill_hue_slider", pathInspector.setFillHue );
  registerOnChange( "fill_hue_slider", pathInspector.setFillHue );
  registerOnClick(  "fill_sat_slider", pathInspector.setFillSaturation );
  registerOnChange( "fill_sat_slider", pathInspector.setFillSaturation );
  registerOnClick(  "fill_lum_slider", pathInspector.setFillLuminance );
  registerOnChange( "fill_lum_slider", pathInspector.setFillLuminance );
  registerOnClick(  "fill_alp_slider", pathInspector.setFillAlpha );
  registerOnChange( "fill_alp_slider", pathInspector.setFillAlpha );

  // Path Operations
  registerOnClick(  "transform", pathInspector.transformMode);
  registerOnClick(  "resize", pathInspector.resizeMode);
  // registerOnClick(  "rotate", pathInspector.rotateMode);

}

self.prototype.update = function() {

  var paths = Anima.Global.editor.getSelectedPaths();

  if(paths.length == 0) {

    this.clear();

  } else {

    this.updateValues(paths[0]);
    this.updateColors(paths[0]);

  }

}

/// helper functions ///////////////////////////////////////////////////////////

self.prototype.changeLineCap = function(e) {

  var idx = e.target.selectedIndex;

  var style;
  switch(idx) {

    case 0: style = "butt"; break;
    case 1: style = "round"; break;
    case 2: style = "square"; break;

  }

  var pathInspector = Anima.Global.PathInspector;
  pathInspector.changeLineCap(style);

}

self.prototype.changeLineJoin = function(e) {

  var idx = e.target.selectedIndex;

  var style;
  switch(idx) {

    case 0: style = "bevel"; break;
    case 1: style = "round"; break;
    case 2: style = "miter"; break;

  }

  var pathInspector = Anima.Global.PathInspector;
  pathInspector.changeLineJoin(style);

}

self.prototype.setValue = function(id, value) {
  var elem = document.getElementById(id);
  elem.value = value;
};

self.prototype.setSelectedIndex = function(id, index) {
  var elem = document.getElementById(id);
  elem.selectedIndex = index;
}

self.prototype.setChecked = function(id, flag) {
  var elem = document.getElementById(id);
  elem.checked = flag;
}

self.prototype.setBackgroundColor = function(id, color) {
  var elem = document.getElementById(id);
  elem.style.backgroundColor = color;
}

self.prototype.getLineCapIndex = function(style) {
  switch(style) {

    case "butt": return 0;
    case "round": return 1;
    case "square": return 2;

  }
}

self.prototype.getLineJoinIndex = function(style) {
  switch(style) {

    case "bevel": return 0;
    case "round": return 1;
    case "miter": return 2;

  }
}

/// reinitialize the view //////////////////////////////////////////////////////

self.prototype.clear = function() {

  this.setValue("line_width", 0);

  this.setSelectedIndex("line_cap", 0);
  this.setSelectedIndex("line_join", 0);

  this.setValue("miter_limit", "");

  this.setChecked("close_path", false);
  this.setChecked("path_stroke", true);

  // Stroke HSLA
  this.setValue("stroke_hue_slider", 0);
  this.setValue("stroke_sat_slider", 0);
  this.setValue("stroke_lum_slider", 100);  // 100 => white
  this.setValue("stroke_alp_slider", 1);

  this.setBackgroundColor("stroke_color", "hsl(0,0%,100%)");  // white

  // Fill HSLA
  this.setValue("fill_hue_slider", 0);
  this.setValue("fill_sat_slider", 0);
  this.setValue("fill_lum_slider", 100);  // 100 => white
  this.setValue("fill_alp_slider", 1);

  this.setBackgroundColor("fill_color", "hsl(0,0%,100%)");  // white

}

/// set parameters /////////////////////////////////////////////////////////////

self.prototype.updateValues = function(path) {

  // Path Attributes
  this.setValue("line_width", path.getLineWidth() );

  var lineCapIndex = this.getLineCapIndex( path.getLineCap() );
  this.setSelectedIndex("line_cap", lineCapIndex);

  var lineJoinIndex = this.getLineJoinIndex( path.getLineJoin() );
  this.setSelectedIndex("line_join", lineJoinIndex );

  this.setValue("miter_limit", path.getMiterLimit() );

  this.setChecked("close_path", path.getClosePath() );

  // Color Attributes
  var stroke = path.getStroke();
  var fill = path.getFill();

  if( stroke && fill ) {

    this.setChecked("path_both", true);

  } else if(fill) {

    this.setChecked("path_fill", true);

  } else {

    this.setChecked("path_stroke", true);

  }

}

self.prototype.updateColors = function(path) {

  // Stroke HSLA
  var sh, ss, sl;
  var shsl;
  sh = path.getStrokeHue();
  ss = path.getStrokeSaturation();
  sl = path.getStrokeLuminance();
  sa = path.getStrokeAlpha();
  shsl = "hsla(" + sh + "," + ss + "%," + sl + "%," + sa + ")";

  this.setValue("stroke_hue_slider", sh);
  this.setValue("stroke_sat_slider", ss);
  this.setValue("stroke_lum_slider", sl);
  this.setValue("stroke_alp_slider", sa);
  this.setBackgroundColor("stroke_color", shsl);

  // Fill HSLA
  var fh, fs, fl;
  var fhsl;
  fh = path.getFillHue();
  fs = path.getFillSaturation();
  fl = path.getFillLuminance();
  fa = path.getFillAlpha();
  fhsl = "hsla(" + fh + "," + fs + "%," + fl + "%," + fa + ")";

  this.setValue("fill_hue_slider", fh);
  this.setValue("fill_sat_slider", fs);
  this.setValue("fill_lum_slider", fl);
  this.setValue("fill_alp_slider", fa);
  this.setBackgroundColor("fill_color", fhsl);

}

} // block

