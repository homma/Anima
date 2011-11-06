/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// transform //////////////////////////////////////////////////////////////////

self.prototype.setLineWidth = function(w) {
  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.pathList[i].setLineWidth(w);
  }
}

self.prototype.translateSelectedPaths = function(x, y) {

  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.selectedPathList[i].translate(x, y);
  }

}

/// resize /////////////////////////////////////////////////////////////////////

self.prototype.resizeSelectedPaths = function(fromX, fromY, scaleX, scaleY) {

  // console.log(fromX, fromY, scaleX, scaleY);

  for (var i = 0; i < this.selectedPathList.length; i++) {
    this.selectedPathList[i].resize(fromX, fromY, scaleX, scaleY);
  }

}

} // block

