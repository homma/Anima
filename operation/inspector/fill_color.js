/*
 * @author Daisuke Homma
 */

new function() { // block

var self = Anima.PathInspector;

/// fill color /////////////////////////////////////////////////////////////////

self.prototype.setFillHue = function(e) {

  var h = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].fillColor.setHue(h);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setFillSaturation = function(e) {

  var s = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].fillColor.setSaturation(s);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setFillLuminance = function(e) {

  var l = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].fillColor.setLuminance(l);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setFillAlpha = function(e) {

  var a = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].fillColor.setAlpha(a);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setFillColorFromView = function() {

  var h = this.getValue("fill_hue_slider");
  var s = this.getValue("fill_sat_slider");
  var l = this.getValue("fill_lum_slider");
  var a = this.getValue("fill_alp_slider");

  this.setFillColor(h, s, l, a);

}

self.prototype.setFillColor = function(h, s, l, a) {

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].fillColor.setHue(h);
    paths[i].fillColor.setSaturation(s);
    paths[i].fillColor.setLuminance(l);
    paths[i].fillColor.setAlpha(a);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();
}

} // block

