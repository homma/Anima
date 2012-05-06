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

  this.selectedPathList = [];

  this.SelectModes = {}
  this.SelectModes.transform = new Anima.TransformMode(this);
  this.SelectModes.resize = new Anima.ResizeMode(this);
  this.SelectModes.rotate = new Anima.RotateMode(this);
  this.SelectModes.connect = new Anima.ConnectMode(this);
  this.SelectModes.pointRemove = new Anima.PointRemoveMode(this);
  this.selectMode = this.SelectModes.transform;

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

