/*
 * @author Daisuke Homma
 */

// Undo Manager

new function() { // block

an.UndoManager = function() {

  // _undoStack => [ [obj, fun, [args]], [obj, fun, [args]], ...]

  this.initUndoManager();

  an.g.undoManager = this;

}
var self = an.UndoManager;

self.prototype.undo = function() {

  var n = this.undoStack.length;
  if (n == 0) return;

  var obj = this.undoStack.pop();

  this.prepareForUndo();
  obj[1].apply(obj[0], obj[2]);
  this.cleanUpForUndo();

}

self.prototype.redo = function() {

  var n = this.redoStack.length;
  if (n == 0) return;

  var obj = this.redoStack.pop();

  obj[1].apply(obj[0], obj[2]);

}

self.prototype.prepareForUndo = function() {

  this.undoStack = this._redoStack;

}

self.prototype.cleanUpForUndo = function() {

  this.undoStack = this._undoStack;

}

self.prototype.registerUndo = function(obj, fun, args) {

  this.undoStack.push([obj, fun, args]);

}

self.prototype.commit = function() {

  // push 'commit' as a commit point
  this.undoStack.push('commit');

}

/**
 * @description folding undo registration
self.prototype.shouldRegister = function(obj, fun) {

  var n = this.undoStack.length;
  if(n == 0) return true;

  var undoEntry = this.undoStack[n - 1];

  if( (undoEntry[0] == obj) && (undoEntry[1] == fun) ) return false;

  return true;

}
*/

self.prototype.initUndoManager = function() {

  this._undoStack = [];
  this._redoStack = [];

  this.undoStack = this._undoStack;
  this.redoStack = this._redoStack;

}

} // block

