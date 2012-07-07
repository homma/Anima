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

  this.EditorModes = {}
  this.EditorModes.curve = new an.CurveCreatorMode(this);
  this.EditorModes.transform = new an.TransformMode(this);
  this.EditorModes.resize = new an.ResizeMode(this);
  this.EditorModes.rotate = new an.RotateMode(this);
  this.EditorModes.connect = new an.ConnectMode(this);
  this.EditorModes.pathDivide = new an.PathDivideMode(this);
  this.EditorModes.pointRemove = new an.PointRemoveMode(this);
  this.editorMode = this.EditorModes.curve;

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

