/*
 * @author Daisuke Homma
 */

new function() {  // block

an.RotateMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

  this.name = "RotateMode";

  this.RotateGuideLineStyle  = "black";
  this.RotateGuideFillStyle  = "lightgray";
  this.RotateGuideLineWidth  = 0.1;
  this.RotateGuideLineLength = 80;
  this.RotateGuideCircleR    = 4;
  this.RotateGuideAngle      = 0;

}
var self = an.RotateMode;

self.prototype = new an.EditorMode();

/// draw ///////////////////////////////////////////////////////////////////////

self.prototype.drawSelectedPath = function(ctx) {

  var arr = this.editor.pathList;

  for(var i = arr.length - 1; i >= 0 ; i--) {

    var path = arr[i];

    if(path.isSelected()) {
      path.drawWithEndPoints(ctx);
    }

  }

}

self.prototype.drawHandle = function(ctx) {

  if( this.editor.selectedPathList.length == 0) { return; };

  ctx.save();

  ctx.lineWidth = this.RotateGuideLineWidth;
  ctx.strokeStyle = this.RotateGuideLineStyle;

  var r = this.RotateGuideCircleR;
  ctx.fillStyle = this.RotateGuideFillStyle;

  var len     = this.RotateGuideLineLength;

  var positions = this.getRotateGuideHandles();
  //       [3]
  // [1] - [0] - [2]
  //       [4]

  ctx.beginPath();
  ctx.arc(positions.x[0], positions.y[0], r, Math.PI*2, false);
  ctx.fill();

  ctx.arc(positions.x[0], positions.y[0], len / 2, Math.PI*2, false);
  ctx.arc(positions.x[0], positions.y[0], len / 3, Math.PI*2, false);

  // left to right
  ctx.moveTo(positions.x[1], positions.y[1]);
  ctx.lineTo(positions.x[2], positions.y[1]);

  // top to bottom
  ctx.moveTo(positions.x[3], positions.y[3]);
  ctx.lineTo(positions.x[4], positions.y[4]);

  ctx.stroke();

  // drawing hanles
  for(var i = 1; i < positions.x.length; i++) {
    ctx.beginPath();
    ctx.arc(positions.x[i], positions.y[i], r, 0, Math.PI*2, false);
    ctx.fill();
  }

  ctx.restore();

}

self.prototype.getRotateGuideHandles = function() {

  var rect = this.editor.getBoundaryOfSelectedPaths();
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

/// hittest ////////////////////////////////////////////////////////////////////

self.prototype.isOnHandle = function(x, y) {

  return this.hitTestRotateHandle(x, y);

}

// returns boolean or handles and position where is hit
self.prototype.hitTestRotateHandle = function(x, y) {

  var hit = false;

  // guard
  if( this.editor.selectedPathList.length == 0) { return hit; };

  var handles = this.getRotateGuideHandles();

  // starts from 1 because handles.x[0] is not actually a handle.
  var i;
  for(i = 1; i < handles.x.length; i++) {

    if( this.hitHandle(handles.x[i], handles.y[i], x, y) ) {
      hit = true;
      break;
    }

  }

  if(hit) {
    var ret = {};
    ret.position = i;

    return ret;
  } else {
    return hit;
  }

}

// should be replaced with isInsidePath() method
self.prototype.hitHandle = function(x0, y0, x1, y1) {

  var r = this.RotateGuideCircleR;

  var left = x0 - r;
  var right = x0 + r;
  var top = y0 + r;
  var bottom = y0 - r;

  if( (x1 >= left) && (x1 <= right) && (y1 <= top) && (y1 >= bottom) ) {
    return true;
  }

  return false;
}

} // block
