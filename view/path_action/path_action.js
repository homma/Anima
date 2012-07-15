/**
 * @author Daisuke Homma
 */

new function() { // block

an.PathActionView = function() {

  this.register();

  an.g.PathActionView = this;

}
var self = an.PathActionView;

self.prototype.register = function() {

  var path_acts = an.g.PathAction;

  an.u.onClick("subdivide", path_acts.subdivide);

}

} // block
