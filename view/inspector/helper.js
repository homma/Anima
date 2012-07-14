/*
 * @author Daisuke Homma
 */

// Path Inspector View

new function() { // block

var self = an.PathInspectorView;

/// helper functions ///////////////////////////////////////////////////////////

self.prototype.showPathAttributes = function() {

  var attrs_bt = document.getElementById("path_attrs_sw");
  var ops_bt   = document.getElementById("path_ops_sw");
  var attrs    = document.getElementById("path_attrs");
  var ops      = document.getElementById("path_ops");

  attrs_bt.style.background  = "white";
  attrs_bt.style.height      = "18px";
  attrs_bt.style.marginTop   = "0px";
  attrs_bt.style.borderRight = "solid 1px black";
  attrs.style.display        = "block";

  ops_bt.style.background    = "lightgray";
  ops_bt.style.height        = "17px";
  ops_bt.style.marginTop     = "1px";
  ops_bt.style.borderLeft    = "none";
  ops.style.display          = "none";

}

self.prototype.showPathOperations = function() {

  var attrs_bt = document.getElementById("path_attrs_sw");
  var ops_bt   = document.getElementById("path_ops_sw");
  var attrs    = document.getElementById("path_attrs");
  var ops      = document.getElementById("path_ops");

  attrs_bt.style.background  = "lightgray";
  attrs_bt.style.height      = "17px";
  attrs_bt.style.marginTop   = "1px";
  attrs_bt.style.borderRight = "none";
  attrs.style.display        = "none";

  ops_bt.style.background    = "white";
  ops_bt.style.height        = "18px";
  ops_bt.style.marginTop     = "0px";
  ops_bt.style.borderLeft    = "solid 1px black";
  ops.style.display          = "block";

}

self.prototype.changeLineCap = function(e) {

  var idx = e.target.selectedIndex;

  var style;
  switch(idx) {

    case 0: style = "butt"; break;
    case 1: style = "round"; break;
    case 2: style = "square"; break;

  }

  var pathInspector = an.g.PathInspector;
  pathInspector.changeLineCap(style);

}

self.prototype.changeLineJoin = function(e) {

  var idx = e.target.selectedIndex;

  var style;
  switch(idx) {

    case 0: style = "bevel"; break;
    case 1: style = "round"; break;
    case 2: style = "miter"; break;

  }

  var pathInspector = an.g.PathInspector;
  pathInspector.changeLineJoin(style);

}

self.prototype.getValue = function(id) {
  var elem = document.getElementById(id);
  return elem.valueAsNumber;
}

self.prototype.setValue = function(id, value) {
  var elem = document.getElementById(id);
  elem.value = value;
};

self.prototype.setSelectedIndex = function(id, index) {
  var elem = document.getElementById(id);
  elem.selectedIndex = index;
}

self.prototype.setChecked = function(id, flag) {
  var elem = document.getElementById(id);
  elem.checked = flag;
}

self.prototype.setBackgroundColor = function(id, color) {
  var elem = document.getElementById(id);
  elem.style.background = color;
}

self.prototype.getLineCapIndex = function(style) {
  switch(style) {

    case "butt": return 0;
    case "round": return 1;
    case "square": return 2;

  }
}

self.prototype.getLineJoinIndex = function(style) {
  switch(style) {

    case "bevel": return 0;
    case "round": return 1;
    case "miter": return 2;

  }
}


} // block

