/*
 * @author Daisuke Homma
 */

// Path Inspector View

new function() { // block

var self = an.PathInspectorView;

self.prototype.registerHandler = function() {

  this.registerSwitcher();
  this.registerLineAttrs();

}

// bind an onclick function to an html element.
self.prototype.registerOnClick = function(id, fun) {
  // console.log(id);
  var elem = document.getElementById(id);
  // console.log(elem);
  elem.onclick = fun;
}

// bind an onchange function to an html element.
self.prototype.registerOnChange = function(id, fun) {
  var elem = document.getElementById(id);
  elem.onchange = fun;
}

// Attribtes / Operations switcher
self.prototype.registerSwitcher = function() {

  this.registerOnClick( "path_attrs_sw", this.showPathAttributes );
  this.registerOnClick( "path_ops_sw", this.showPathOperations);

}

// Line Attributes
self.prototype.registerLineAttrs = function() {
  var pathInspector = an.g.PathInspector;

  this.registerOnClick( "line_width", pathInspector.changeLineWidth );
  this.registerOnChange( "line_width", pathInspector.changeLineWidth );

  this.registerOnClick( "line_cap", this.changeLineCap );
  this.registerOnChange( "line_cap", this.changeLineCap );
  this.registerOnClick( "line_join", this.changeLineJoin );
  this.registerOnChange( "line_join", this.changeLineJoin );
  this.registerOnClick( "miter_limit", pathInspector.changeMiterLimit );
  this.registerOnChange( "miter_limit", pathInspector.changeMiterLimit );

  this.registerOnClick( "close_path", pathInspector.setClosePath );
  this.registerOnChange( "close_path", pathInspector.setClosePath );
}

} // block

