/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.PathInspector;

/// line attributes ////////////////////////////////////////////////////////////

self.prototype.changeLineWidth = function(e) {
  var w = e.target.valueAsNumber;

  var paths = an.g.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setLineWidth(w);
  }

  an.g.editor.draw();
}

self.prototype.changeLineCap = function(style) {

  var paths = an.g.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setLineCap(style);
  }

  an.g.editor.draw();
}

self.prototype.changeLineJoin = function(style) {

  var paths = an.g.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setLineJoin(style);
  }

  an.g.editor.draw();
}

self.prototype.changeMiterLimit = function(e) {
  var val = e.target.valueAsNumber;

  var paths = an.g.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setMiterLimit(val);
  }

  an.g.editor.draw();

}

self.prototype.setClosePath = function(e) {

  var f = e.target.checked;

  var paths = an.g.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setClosePath(f);
  }

  an.g.editor.draw();

}

self.prototype.setStroke = function(e) {

  var f = e.target.checked;

  var paths = an.g.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setStroke(true);
    paths[i].setFill(false);
  }

/*
  var fillColor = document.getElementById("fill_color_field");
  fillColor.style.visibility = "hidden";
  fillColor.style.display = "none";
*/

  an.g.editor.draw();

}

self.prototype.setFill = function(e) {

  var f = e.target.checked;

  var paths = an.g.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setStroke(false);
    paths[i].setFill(true);
  }

  an.g.editor.draw();

}

self.prototype.setBoth = function(e) {

  var f = e.target.checked;

  var paths = an.g.editor.getSelectedPaths();
  for(var i = 0; i < paths.length; i++) {
    paths[i].setStroke(true);
    paths[i].setFill(true);
  }

  an.g.editor.draw();

}

} // block
