/*
 * @author Daisuke Homma
 */

new function() {  // block

// Graphic Data Editor
// Every change to the model should go through this

an.Editor = function() {

  this.canvas = an.g.canvas;
  this.newPath = null;
  this.pathList = [];
  this.clipBoard = [];
  this.undoList = [];
  this.onion = false;

  this.selectedPathList = [];

  this.SelectModes = {}
  this.SelectModes.transform = new an.TransformMode(this);
  this.SelectModes.resize = new an.ResizeMode(this);
  this.SelectModes.rotate = new an.RotateMode(this);
  this.SelectModes.connect = new an.ConnectMode(this);
  this.SelectModes.pointRemove = new an.PointRemoveMode(this);
  this.selectMode = this.SelectModes.transform;

  this.interface = new an.EditorInterface(this);

}
var self = an.Editor;

self.prototype.initialize = function() {

  this.newPath = null;
  this.pathList = [];
  this.clipBoard = [];
  this.undoList = [];
  this.onion = false;

  this.selectedPathList = [];

}

} // block

