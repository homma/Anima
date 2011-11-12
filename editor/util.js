/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

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

self.prototype.getRotateGuideHandles = function() {

  var rect = this.getBoundaryOfSelectedPaths();
  var ret = {};

  var len = this.RotateGuideLineLength;

  var x = new Array();
  var y = new Array();

  //       [3]
  // [1] - [0] - [2]
  //       [4]
  // [0] : center : not a handle. just for convinience.
  x[0] = rect.x + rect.w / 2;
  y[0] = rect.y + rect.h / 2;

  // [1] : left
  x[1] = x[0] - len;
  y[1] = y[0];

  // [2] : right
  x[2] = x[0] + len;
  y[2] = y[0];

  // [3] : top
  x[3] = x[0];
  y[3] = y[0] - len;

  // [4] : bottom
  x[4] = x[0];
  y[4] = y[0] + len;

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

