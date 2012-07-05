/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// change attribute ///////////////////////////////////////////////////////////

self.prototype.setLineWidth = function(w) {
  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.pathList[i].setLineWidth(w);
  }
}

/// translate(move) ////////////////////////////////////////////////////////////

self.prototype.translateSelectedPaths = function(x, y) {

  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.selectedPathList[i].translate(x, y);
  }

}

self.prototype.commitTranslation = function() {
  this.selectMode.commitTranslation();
}

/// connect ////////////////////////////////////////////////////////////////////

//   from: from path,  // source path (moving)
//   head: boolean,    // connect head (of source path to target path)
//     to: to path,    // target path (not moving, fixed position)
// toHead: boolean     // connect to head or not
self.prototype.connectPaths = function(from, head, to, toHead) {

  if(!head) from.reverse();
  if(toHead) to.reverse();

  to.append(from);
  this.removePath(from);

}

/// resize /////////////////////////////////////////////////////////////////////

self.prototype.resizeSelectedPaths = function(fromX, fromY, scaleX, scaleY) {

  // console.log(fromX, fromY, scaleX, scaleY);

  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.selectedPathList[i].resize(fromX, fromY, scaleX, scaleY);
  }

}

self.prototype.commitSize = function() {
  // do something
}

/// rotate /////////////////////////////////////////////////////////////////////

self.prototype.rotateSelectedPaths = function() {

  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.selectedPathList[i].rotate();
  }

}

self.prototype.commitRotation = function() {
  // do something
}

} // block

