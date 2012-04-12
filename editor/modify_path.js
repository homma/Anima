/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// change attribute ///////////////////////////////////////////////////////////

self.prototype._setLineWidth = function(w) {
  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.pathList[i].setLineWidth(w);
  }
}

/// translate(move) ////////////////////////////////////////////////////////////

self.prototype._translateSelectedPaths = function(x, y) {

  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.selectedPathList[i].translate(x, y);
  }

}

self.prototype._commitTranslation = function() {
  // do something
}

/// resize /////////////////////////////////////////////////////////////////////

self.prototype._resizeSelectedPaths = function(fromX, fromY, scaleX, scaleY) {

  // console.log(fromX, fromY, scaleX, scaleY);

  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.selectedPathList[i].resize(fromX, fromY, scaleX, scaleY);
  }

}

self.prototype._commitSize = function() {
  // do something
}

/// rotate /////////////////////////////////////////////////////////////////////

self.prototype._rotateSelectedPaths = function() {

  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.selectedPathList[i].rotate();
  }

}

self.prototype._commitRotation = function() {
  // do something
}

} // block

