/*
 * @author Daisuke Homma
 */

new function() {  // block

// Graphic Data Editor

Anima.Editor = function(canvas) {

  this.canvas = canvas;
  this.newPath = null;
  this.pathList = [];
  this.clipBoard = [];
  this.undoList = [];
  this.onion = false;

  this.SelectModes = {}
  this.SelectModes.transform = 1;
  this.SelectModes.resize = 2;
  this.SelectModes.rotate = 3;
  this.selectMode = this.SelectModes.transform;

  this.selectedPathList = [];

  Anima.Global.editor = this;

  this.ResizeGuideLineStyle = "black";
  this.ResizeGuideFillStyle = "lightgray";
  this.ResizeGuideLineWidth = 0.1;
  this.ResizeGuideCircleR   = 4;

  this.RotateGuideLineStyle  = "black";
  this.RotateGuideFillStyle  = "lightgray";
  this.RotateGuideLineWidth  = 0.1;
  this.RotateGuideLineLength = 80;
  this.RotateGuideCircleR    = 4;
  this.RotateGuideAngle      = 0;

}
var self = Anima.Editor;

self.prototype.initialize = function() {

  this.newPath = null;
  this.pathList = [];
  this.clipBoard = [];
  this.undoList = [];
  this.onion = false;

  this.selectedPathList = [];

}

} // block

