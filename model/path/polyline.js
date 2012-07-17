/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Path;

self.prototype.createPolyLine = function(poly) {

  var self = this;
  poly.forEach( function(v, i) {

    var next = i + 1;
    if( i == poly.length - 1) { next = 0 };

    self.addLine(v.x, v.y, poly[next].x, poly[next].y);

  });

  this.finished();

}

}  // block

