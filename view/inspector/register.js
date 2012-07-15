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

// Attribtes / Operations switcher
self.prototype.registerSwitcher = function() {

  an.u.onClick( "path_attrs_sw", this.showPathAttributes );
  an.u.onClick( "path_ops_sw", this.showPathOperations);

}

// Line Attributes
self.prototype.registerLineAttrs = function() {
  var pathInspector = an.g.PathInspector;

  an.u.onClick( "line_width", pathInspector.changeLineWidth );
  an.u.onChange( "line_width", pathInspector.changeLineWidth );

  an.u.onClick( "line_cap", this.changeLineCap );
  an.u.onChange( "line_cap", this.changeLineCap );
  an.u.onClick( "line_join", this.changeLineJoin );
  an.u.onChange( "line_join", this.changeLineJoin );
  an.u.onClick( "miter_limit", pathInspector.changeMiterLimit );
  an.u.onChange( "miter_limit", pathInspector.changeMiterLimit );

  an.u.onClick( "close_path", pathInspector.setClosePath );
  an.u.onChange( "close_path", pathInspector.setClosePath );
}

} // block

