/*
 * @author Daisuke Homma
 */

// Cubic Bezier Curve

Anima.Curve = function(n0, n1, n2, n3, n4, n5, n6, n7) {
  this.p0x  = n0;  // anchor point zero
  this.p0y  = n1;
  this.cp0x = n2;  // control point zero
  this.cp0y = n3;
  this.cp1x = n4;  // control point one
  this.cp1y = n5;
  this.p1x  = n6;  // anchor point one
  this.p1y  = n7;

  this.prev = null;
  this.next = null;

  this.smoothConnectionFromPrev = true;
  this.smoothConnectionToNext = true;

  this.setSelectedPoint = null;
}

