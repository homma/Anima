/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.PathInspector = function() {

  Anima.Global.PathInspector = this;

}
var self = Anima.PathInspector;

self.prototype.changeLineWidth = function(e) {
  var w = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setLineWidth(w);
  }

  Anima.Global.editor.draw();
}

self.prototype.changeLineCap = function(style) {

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setLineCap(style);
  }

  Anima.Global.editor.draw();
}

self.prototype.changeLineJoin = function(style) {

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setLineJoin(style);
  }

  Anima.Global.editor.draw();
}

self.prototype.changeMiterLimit = function(e) {
  var val = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setMiterLimit(val);
  }

  Anima.Global.editor.draw();

}

self.prototype.setClosePath = function(e) {

  var f = e.target.checked;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setClosePath(f);
  }

  Anima.Global.editor.draw();

}

self.prototype.setStroke = function(e) {

  var f = e.target.checked;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setStroke(true);
    paths[i].setFill(false);
  }

/*
  var fillColor = document.getElementById("fill_color_field");
  fillColor.style.visibility = "hidden";
  fillColor.style.display = "none";
*/

  Anima.Global.editor.draw();

}

self.prototype.setFill = function(e) {

  var f = e.target.checked;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setStroke(false);
    paths[i].setFill(true);
  }

  Anima.Global.editor.draw();

}

self.prototype.setBoth = function(e) {

  var f = e.target.checked;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setStroke(true);
    paths[i].setFill(true);
  }

  Anima.Global.editor.draw();

}

/// stroke color ///////////////////////////////////////////////////////////////

self.prototype.setStrokeHue = function(e) {

  var h = e.target.valueAsNumber;
  // console.log("h: " + h);

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setStrokeHue(h);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setStrokeSaturation = function(e) {

  var s = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setStrokeSaturation(s);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setStrokeLuminance = function(e) {

  var l = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setStrokeLuminance(l);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setStrokeAlpha = function(e) {

  var a = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setStrokeAlpha(a);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

/// fill color /////////////////////////////////////////////////////////////////

self.prototype.setFillHue = function(e) {

  var h = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setFillHue(h);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setFillSaturation = function(e) {

  var s = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setFillSaturation(s);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setFillLuminance = function(e) {

  var l = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setFillLuminance(l);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.setFillAlpha = function(e) {

  var a = e.target.valueAsNumber;

  var paths = Anima.Global.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setFillAlpha(a);
  }

  Anima.Global.pathInspectorView.update();
  Anima.Global.editor.draw();

}

self.prototype.transformMode = function() {

  Anima.Global.editor.setSelectMode(Anima.Global.editor.SelectModes.transform);
  Anima.Global.editor.draw();

}

self.prototype.resizeMode = function() {

  Anima.Global.editor.setSelectMode(Anima.Global.editor.SelectModes.resize);
  Anima.Global.editor.draw();

}

self.prototype.rotateMode = function() {

  Anima.Global.editor.setSelectMode(Anima.Global.editor.SelectModes.rotate);
  Anima.Global.editor.draw();

}

} // block

