/*
 * @author Daisuke Homma
 */

new function() { // block

/// Path

Anima.Path = function() {

  this.initPath();

}
self = Anima.Path;

Anima.Path.prototype.initPath = function() {

  this.selected = false;    // path is selected
  this.complete = false;    // path is fixed

  this.closePath = false;

  this.lineWidth = 0.5;
  this.lineCap = "butt";  // butt / round / square
  this.lineJoin = "miter";  // bevel / round / miter
  this.miterLimit = 10.0;  // > 0

  this.stroke = true;
  this.fill = false;

  this.strokeColor = new Anima.Color(0, 100, 0, 1); // H, S, L, A => black
  this.fillColor = new Anima.Color(0, 100, 0, 1);   // H, S, L, A => black

  this.strokeStyle = null;            // color or gradient
  this.fillStyle = null;              // color or gradient

  this.shadowColor = null;
  this.shadowOffsetX = null;
  this.shadowOffsetY = null;
  this.shadowBlur = null;

//  this.width = 0;
//  this.height = 0;
//  edges = [];
  this.edges = new Array();

}

};  // block
