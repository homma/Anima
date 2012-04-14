/*
 * @author Daisuke Homma
 */

new function() { // block

var self = Anima.PathInspector;

/// stroke color ///////////////////////////////////////////////////////////////

self.prototype.setStrokeHue = function(e) {

  var h = e.target.valueAsNumber;
  // console.log("h: " + h);

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].strokeColor.setHue(h);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setStrokeSaturation = function(e) {

  var s = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].strokeColor.setSaturation(s);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setStrokeLuminance = function(e) {

  var l = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].strokeColor.setLuminance(l);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setStrokeAlpha = function(e) {

  var a = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].strokeColor.setAlpha(a);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.getValue = function(id) {
  return document.getElementById(id).valueAsNumber;
}

self.prototype.setStrokeColorFromView = function() {

  var h = this.getValue("stroke_hue_slider");
  var s = this.getValue("stroke_sat_slider");
  var l = this.getValue("stroke_lum_slider");
  var a = this.getValue("stroke_alp_slider");

  this.setStrokeColor(h, s, l, a);

}

self.prototype.setStrokeColor = function(h, s, l, a) {

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].strokeColor.setHue(h);
    paths[i].strokeColor.setSaturation(s);
    paths[i].strokeColor.setLuminance(l);
    paths[i].strokeColor.setAlpha(a);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();
}

} // block
