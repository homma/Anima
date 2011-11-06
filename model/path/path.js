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

  this.strokeH = 0;
  this.strokeS = 100;
  this.strokeL = 0;  // black
  this.strokeA = 1;
  this.strokeHSLA = null;
  this.updateStrokeColor();

  this.fillH = 0;
  this.fillS = 100;
  this.fillL = 0;  // black
  this.fillA = 1;
  this.fillHSLA = null;
  this.updateFillColor();

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
