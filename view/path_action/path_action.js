/**
 * @author Daisuke Homma
 */

new function() { // block

an.PathActionView = function() {

  this.register();

  an.g.PathActionView = this;

}
var self = an.PathActionView;

// bind an onclick function to an html element.
self.prototype.registerOnClick = function(id, fun) {

  var elem = document.getElementById(id);
  elem.onclick = fun;

}

self.prototype.register = function() {

  var path_acts = an.g.PathAction;

  this.registerOnClick("subdivide", path_acts.subdivide);

}

} // block
