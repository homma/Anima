/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// modify current path ////////////////////////////////////////////////////////

self.prototype.addPath = function(p) {
  this.pathList.push(p);

  Anima.Global.undoManager.registerUndo(this, this.removePath, [p]);

}

self.prototype.getNewPath = function(p) {

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
      Anima.Global.undoManager.registerUndo(this, this.addPath, [p]);
    }
  }

}

} // block

