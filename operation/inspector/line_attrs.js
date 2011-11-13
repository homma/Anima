/*
 * @author Daisuke Homma
 */

new function() { // block

var self = Anima.PathInspector;

/// line attributes ////////////////////////////////////////////////////////////

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

} // block
