/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

self.prototype.getResizeGuideRect = function() {

  // surrounding square
  return this.getBoundaryOfSelectedPaths();

}

self.prototype.getResizeGuideHandles = function() {

  var rect = this.getBoundaryOfSelectedPaths();
  var ret = {};

  // handle
  //   0 - 7 - 3
  //   4       6
  //   1 - 5 - 2
  var x = new Array();
  var y = new Array();
  x[0] = rect.x;
  y[0] = rect.y;
  x[1] = rect.x;
  y[1] = rect.y + rect.h;
  x[2] = rect.x + rect.w;
  y[2] = rect.y + rect.h;
  x[3] = rect.x + rect.w;
  y[3] = rect.y;
  x[4] = rect.x;
  y[4] = rect.y + rect.h / 2;
  x[5] = rect.x + rect.w / 2;
  y[5] = rect.y + rect.h;
  x[6] = rect.x + rect.w;
  y[6] = rect.y + rect.h / 2;
  x[7] = rect.x + rect.w / 2;
  y[7] = rect.y;

  ret.x = x;
  ret.y = y;

  return ret;
}

self.prototype.getBoundaryOfSelectedPaths = function() {

  if(this.selectedPathList.length == 0) { return; };

  var rect = this.selectedPathList[0].getBoundary();

  for(var i = 1; i < this.selectedPathList.length; i++) {
    var bound = this.selectedPathList[i].getBoundary();
    rect = Anima.Util.getCompoundBoundary(bound, rect);
  }

  return rect;
}

} // block

