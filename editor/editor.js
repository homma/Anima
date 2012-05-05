/*
 * @author Daisuke Homma
 */

new function() {  // block

// Graphic Data Editor
// Every change to the model should go through this

Anima.Editor = function() {

  this.canvas = Anima.Global.canvas;
  this.newPath = null;
  this.pathList = [];
  this.clipBoard = [];
  this.undoList = [];
  this.onion = false;

  this.SelectModes = {}
  this.SelectModes.transform = new Anima.TransformMode(this);
  this.SelectModes.resize = new Anima.ResizeMode(this);
  this.SelectModes.rotate = new Anima.RotateMode(this);
  this.SelectModes.connect = new Anima.ConnectMode(this);
  this.selectMode = this.SelectModes.transform;

  this.selectedPathList = [];

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

  this.interface = new Anima.EditorInterface(this);

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

