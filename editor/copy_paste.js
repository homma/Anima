/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// delete / cut / copy / paste selected paths /////////////////////////////////

self.prototype.deleteAll = function() {

  this.selectedPathList = [];
  this.pathList = [];

}

self.prototype.deleteSelected = function() {

  // copy selected path list
  var lst = [];
  this.selectedPathList.forEach( function(v) { lst.push(v); } );

  // remove paths
  lst.forEach( function(v) {

    this.removePath(v);

  }, this);

}

self.prototype.cut = function() {

  this.copy();
  this.deleteSelected();

}

self.prototype.copy = function() {

  this.clearClipBoard();

  for (var i = 0; i < this.selectedPathList.length; i++) {

    var path = this.selectedPathList[i].duplicate();
    path.translate(20, 20);
    this.clipBoard.push(path);

  }
}

self.prototype.paste = function() {

  if( this.clipBoard.length == 0 ) { return; }

  this.deselectAll();

  for (var i = 0; i < this.clipBoard.length; i++) {

      var path = this.clipBoard[i].duplicate();
      this.addPath(path);
      this.interface.selectPath(path);

  }
}

self.prototype.clearClipBoard = function() {

  this.clipBoard = [];

}

self.prototype.clipBoardContents = function() {

  return this.clipBoard;

}

} // block
