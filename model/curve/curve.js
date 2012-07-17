/*
 * @author Daisuke Homma
 */

// Cubic Bezier Curve

new function() { // block

an.Curve = function(n0, n1, n2, n3, n4, n5, n6, n7) {

  this.p0x = n0;  // anchor point zero
  this.p0y = n1;
  this.c0x = n2;  // control point zero
  this.c0y = n3;
  this.c1x = n4;  // control point one
  this.c1y = n5;
  this.p1x = n6;  // anchor point one
  this.p1y = n7;

  this.prev = null;
  this.next = null;

  // smoothly connecting to the next curve.
  this.smoothConnect = true;

  this.path = null;

}

var self = an.Curve;

}
