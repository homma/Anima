/*
 * @author Daisuke Homma
 */

// Path Inspector View

new function() { // block

var self = an.PathInspectorView;

/// update parameters //////////////////////////////////////////////////////////

self.prototype.update = function() {

  var paths = an.g.editor.getSelectedPaths();

  if(paths.length == 0) {

    this.clear();

  } else {

    this.updateValues(paths[0]);
    this.updateColors(paths[0]);

  }

}

self.prototype.clear = function() {

  this.setValue("line_width", 0);

  this.setSelectedIndex("line_cap", 0);
  this.setSelectedIndex("line_join", 0);

  this.setValue("miter_limit", "");

  this.setChecked("close_path", false);
  this.setChecked("path_stroke", true);

  this.setStrokeColorAttrs(0, 0, 100, 1);  // lum == 100 => white
  this.setFillColorAttrs(0, 0, 100, 1);    // lum == 100 => white

}

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

