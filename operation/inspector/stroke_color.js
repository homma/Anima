/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.PathInspector;

/// stroke color ///////////////////////////////////////////////////////////////

self.prototype.setStrokeHue = function(e) {

  var h = e.target.valueAsNumber;
  // console.log("h: " + h);

  var paths = an.g.editor.getSelectedPaths();
  paths.forEach( function(v) {
    an.g.editor.setStrokeHueOfPath(v, h);
  });

  an.g.pathInspectorView.update();
  an.g.editor.draw();

}

self.prototype.setStrokeSaturation = function(e) {

  var s = e.target.valueAsNumber;

  var paths = an.g.editor.getSelectedPaths();
  paths.forEach( function(v) {
    an.g.editor.setStrokeSaturationOfPath(v, s);
  });

  an.g.pathInspectorView.update();
  an.g.editor.draw();

}

self.prototype.setStrokeLuminance = function(e) {

  var l = e.target.valueAsNumber;

  var paths = an.g.editor.getSelectedPaths();
  paths.forEach( function(v) {
    an.g.editor.setStrokeLuminanceOfPath(v, l);
  });

  an.g.pathInspectorView.update();
  an.g.editor.draw();

}

self.prototype.setStrokeAlpha = function(e) {

  var a = e.target.valueAsNumber;

  var paths = an.g.editor.getSelectedPaths();
  paths.forEach( function(v) {
    an.g.editor.setStrokeAlphaOfPath(v, a);
  });

  an.g.pathInspectorView.update();
  an.g.editor.draw();

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

  var paths = an.g.editor.getSelectedPaths();
  paths.forEach( function(v) {
    an.g.editor.setStrokeHueOfPath(v, h);
    an.g.editor.setStrokeSaturationOfPath(v, s);
    an.g.editor.setStrokeLuminanceOfPath(v, l);
    an.g.editor.setStrokeAlphaOfPath(v, a);
  });

  an.g.pathInspectorView.update();
  an.g.editor.draw();
}

} // block
