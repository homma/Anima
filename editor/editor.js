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
  this.frame = null;
  this.track = null;
  this.onion = false;

  this.selectedPathList = [];

  this.EditorModes = {}
  this.EditorModes.pen = new an.PenMode(this);
  this.EditorModes.curve = new an.CurveCreatorMode(this);
  this.EditorModes.shape = new an.ShapeCreatorMode(this);
  this.EditorModes.transform = new an.TransformMode(this);
  this.EditorModes.resize = new an.ResizeMode(this);
  this.EditorModes.rotate = new an.RotateMode(this);
  this.EditorModes.connect = new an.ConnectMode(this);
  this.EditorModes.pathSplit = new an.PathSplitMode(this);
  this.EditorModes.pointRemove = new an.PointRemoveMode(this);
  this.EditorModes.pointAdd = new an.PointAddMode(this);
  this.editorMode = this.EditorModes.curve;

  this.interface = new an.EditorInterface(this);

}
var self = an.Editor;

self.prototype.initialize = function() {

  this.newPath = null;
  this.pathList = [];
  this.clipBoard = [];
  this.frame = null;
  this.track = null;
  this.onion = false;

  this.selectedPathList = [];

}

} // block

