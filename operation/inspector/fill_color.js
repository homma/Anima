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

} // block

