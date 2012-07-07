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
  this.editorMode.commitTranslation();
}

/// connect ////////////////////////////////////////////////////////////////////

/**
 * @description connect two path
 * @param {Path} from source path (moving)
 * @param {Boolean} head connect head (of source path to target path)
 * @param {Path} to target path (not moving, fixed position)
 * @param {Boolean} toHead connect to head or not
 * @returns {}
 */
self.prototype.connectPaths = function(from, head, to, toHead) {

  if(!head) from.reverse();
  if(toHead) to.reverse();

  to.append(from);
  this.removePath(from);

}

/// connect ////////////////////////////////////////////////////////////////////

/**
 * @description divide path
 */
self.prototype.dividePath = function() {

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

