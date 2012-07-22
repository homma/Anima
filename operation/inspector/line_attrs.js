/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.PathInspector;

/// line attributes ////////////////////////////////////////////////////////////

self.prototype.changeLineWidth = function(e) {

  var w = e.target.valueAsNumber;

  var paths = an.g.editor.getSelectedPaths();
  paths.forEach( function(v) {
    an.g.editor.setLineWidthOfPath(v, w);
  });

  an.g.editor.draw();

}

self.prototype.changeLineCap = function(style) {

  var paths = an.g.editor.getSelectedPaths();
  paths.forEach( function(v) {
    an.g.editor.setLineCapOfPath(v, style);
  });

  an.g.editor.draw();

}

self.prototype.changeLineJoin = function(style) {

  var paths = an.g.editor.getSelectedPaths();
  paths.forEach( function(v) {
    an.g.editor.setLineJoinOfPath(v, style);
  });

  an.g.editor.draw();

}

self.prototype.changeMiterLimit = function(e) {
  var val = e.target.valueAsNumber;

  var paths = an.g.editor.getSelectedPaths();
  paths.forEach( function(v) {
    an.g.editor.setMiterLimitOfPath(v, val);
  });

  an.g.editor.draw();

}

self.prototype.setClosePath = function(e) {

  var f = e.target.checked;

  var paths = an.g.editor.getSelectedPaths();
  paths.forEach( function(v) {
    an.g.editor.setClosePath(v, f);
  });

  an.g.editor.draw();

}

self.prototype.setStroke = function(e) {

  var f = e.target.checked;

  var paths = an.g.editor.getSelectedPaths();
  paths.forEach( function(v) {
    an.g.editor.setStroke(v, true);
    an.g.editor.setFill(v, false);
  });

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
  paths.forEach( function(v) {
    an.g.editor.setStroke(v, false);
    an.g.editor.setFill(v, true);
  });

  an.g.editor.draw();

}

self.prototype.setBoth = function(e) {

  var f = e.target.checked;

  var paths = an.g.editor.getSelectedPaths();
  paths.forEach( function(v) {
    an.g.editor.setStroke(v, true);
    an.g.editor.setFill(v, true);
  });

  an.g.editor.draw();

}

} // block
