/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// modify current path ////////////////////////////////////////////////////////

self.prototype.addPath = function(p) {

  this.pathList.push(p);

  an.g.undoManager.registerUndo(this, this.removePath, [p]);

}

self.prototype.getNewPath = function() {

  return this.newPath;

}

self.prototype.setNewPath = function(p) {

  this.newPath = p;

}

self.prototype.removePath = function(p) {

  this.interface.deselectPath(p);

  for(var i = 0; i < this.pathList.length; i++) {

    if(this.pathList[i] == p) {
      // console.log("removePath: " + i);
      this.pathList.splice(i , 1);
      an.g.undoManager.registerUndo(this, this.addPath, [p]);
    }
  }

}

///////////////////////////////////////
// shape

/**
 * @description create a shape
 * @param {Number} x x coordinate of left top corner of new shape
 * @param {Number} y y coordinate of left top corner of new shape
 * @param {Number} w width of new shape
 * @param {Number} h height of new shape
 */
self.prototype.createShape = function(x, y, w, h) {

  this.editorMode.createShape(x, y, w, h);

}

} // block

