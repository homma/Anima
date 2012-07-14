/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.ColorStockView;

self.prototype.getValue = function(id) {
  var elem = document.getElementById(id);
  return elem.valueAsNumber;
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
  elem.style.background = color;
}

self.prototype.setStrokeColorAttrs = function(hue, sat, lum, alp) {

  hsla = "hsla(" + hue + "," + sat + "%," + lum + "%," + alp + ")";

  this.setValue("stroke_hue_slider", hue);
  this.setValue("stroke_sat_slider", sat);
  this.setValue("stroke_lum_slider", lum);
  this.setValue("stroke_alp_slider", alp);
  this.setBackgroundColor("stroke_color", hsla);

}

self.prototype.setFillColorAttrs = function(hue, sat, lum, alp) {

  hsla = "hsla(" + hue + "," + sat + "%," + lum + "%," + alp + ")";

  this.setValue("fill_hue_slider", hue);
  this.setValue("fill_sat_slider", sat);
  this.setValue("fill_lum_slider", lum);
  this.setValue("fill_alp_slider", alp);
  this.setBackgroundColor("fill_color", hsla);

}

self.prototype.setStrokeColorAttrsFromColor = function(color) {

  var hue = color.getHue();
  var sat = color.getSaturation();
  var lum = color.getLuminance();
  var alp = color.getAlpha();

  this.setStrokeColorAttrs(hue, sat, lum, alp);

}

self.prototype.setFillColorAttrsFromColor = function(color) {

  var hue = color.getHue();
  var sat = color.getSaturation();
  var lum = color.getLuminance();
  var alp = color.getAlpha();

  this.setFillColorAttrs(hue, sat, lum, alp);

}

self.prototype.getStrokeColor = function() {

  var hue = this.getValue("stroke_hue_slider");
  var sat = this.getValue("stroke_sat_slider");
  var lum = this.getValue("stroke_lum_slider");
  var alp = this.getValue("stroke_alp_slider");

  var color = new an.Color(hue, sat, lum, alp);
  return color;

}

self.prototype.getFillColor = function() {

  var hue = this.getValue("fill_hue_slider");
  var sat = this.getValue("fill_sat_slider");
  var lum = this.getValue("fill_lum_slider");
  var alp = this.getValue("fill_alp_slider");

  var color = new an.Color(hue, sat, lum, alp);
  return color;

}

} // block

