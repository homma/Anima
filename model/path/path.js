/*
 * @author Daisuke Homma
 */

new function() { // block

/// Path

an.Path = function() {

  this.initPath();

}
var self = an.Path;

self.prototype.initPath = function() {

  this.selected = false;    // path is selected
  this.complete = false;    // path is fixed

  this.closePath = false;

  this.lineWidth = an.d.lineWidth;
  this.lineCap = an.d.lineCap;
  this.lineJoin = an.d.lineJoin;
  this.miterLimit = an.d.miterLimit;

  this.stroke = true;
  this.fill = false;

  this.strokeColor = new an.Color(an.d.strokeH, an.d.strokeS,
                                  an.d.strokeL, an.d.strokeA);
  this.fillColor = new an.Color(an.d.fillH, an.d.fillS, an.d.fillL, an.d.fillA);

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
