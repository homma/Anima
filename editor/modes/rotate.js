/*
 * @author Daisuke Homma
 */

new function() {  // block

an.RotateMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

  this.name = "RotateMode";

  this.rect = null;  // surrounding rect

}
var self = an.RotateMode;

self.prototype = new an.EditorMode();

/// direction //////////////////////////////////////////////////////////////////

  //            [an.k.T]
  // [an.k.L] - [an.k.C] - [an.k.R]
  //            [an.k.B]
  //
  // [an.k.C] : center
  // [an.k.L] : left
  // [an.k.R] : right
  // [an.k.T] : top
  // [an.k.B] : bottom

/// setter /////////////////////////////////////////////////////////////////////

self.prototype.setRotateAngle = function(r) {

  this.RotateGuideAngle = r;

}

self.prototype.getRotateAngle = function() {

  return this.RotateGuideAngle;

}

self.prototype.resetRotation = function() {

  this.RotateGuideAngle = 0;
  this.rect = this.editor.getBoundaryOfSelectedPaths();

}

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

  ctx.lineWidth = an.d.RotateGuideLineWidth;
  ctx.strokeStyle = an.d.RotateGuideLineStyle;

  var r = an.d.RotateGuideCircleR;
  ctx.fillStyle = an.d.RotateGuideFillStyle;

  var len     = an.d.RotateGuideLineLength;

  var positions = this.getRotateHandles();

  ctx.beginPath();
  ctx.arc(positions.x[an.k.C], positions.y[an.k.C], r, Math.PI*2, false);
  ctx.fill();

  ctx.arc(positions.x[an.k.C], positions.y[an.k.C], len / 2, Math.PI*2, false);
  ctx.arc(positions.x[an.k.C], positions.y[an.k.C], len / 3, Math.PI*2, false);

  // left
  ctx.moveTo(positions.x[an.k.C], positions.y[an.k.C]);
  ctx.lineTo(positions.x[an.k.L], positions.y[an.k.L]);

  // right
  ctx.moveTo(positions.x[an.k.C], positions.y[an.k.C]);
  ctx.lineTo(positions.x[an.k.R], positions.y[an.k.R]);

  // top
  ctx.moveTo(positions.x[an.k.C], positions.y[an.k.C]);
  ctx.lineTo(positions.x[an.k.T], positions.y[an.k.T]);

  // bottom
  ctx.moveTo(positions.x[an.k.C], positions.y[an.k.C]);
  ctx.lineTo(positions.x[an.k.B], positions.y[an.k.B]);

  ctx.stroke();

  // drawing hanles
  // for each an.k.L, an.k.R, an.k.T, an.k.B
  var dir = [an.k.L, an.k.R, an.k.T, an.k.B];

  dir.forEach(function(v) {

    ctx.beginPath();
    ctx.arc(positions.x[v], positions.y[v], r, 0, Math.PI*2, false);
    ctx.fill();

  });

  ctx.restore();

}

self.prototype.getRotateHandles = function() {

  var ret = {};

  var len = an.d.RotateGuideLineLength;
  var r = this.RotateGuideAngle;

  var x = new Array();
  var y = new Array();

  x[an.k.C] = this.rect.x + this.rect.w / 2;
  y[an.k.C] = this.rect.y + this.rect.h / 2;

  // Left
  x[an.k.L] = x[an.k.C] - len * Math.cos(r + Math.PI);
  y[an.k.L] = y[an.k.C] - len * Math.sin(r + Math.PI);

  // Right
  x[an.k.R] = x[an.k.C] - len * Math.cos(r);
  y[an.k.R] = y[an.k.C] - len * Math.sin(r);

  // Top
  x[an.k.T] = x[an.k.C] - len * Math.cos(r + Math.PI / 2);
  y[an.k.T] = y[an.k.C] - len * Math.sin(r + Math.PI / 2);

  // Bottom
  x[an.k.B] = x[an.k.C] - len * Math.cos(r - Math.PI / 2);
  y[an.k.B] = y[an.k.C] - len * Math.sin(r - Math.PI / 2);

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

  var handles = this.getRotateHandles();

  // for each an.k.L, an.k.R, an.k.T, an.k.B
  var dir = [an.k.L, an.k.R, an.k.T, an.k.B];

  var n = 0;
  var i = 0;

  for(i = 0; i < dir.length; i++) {

    n = dir[i];

    if( this.hitHandle(handles.x[n], handles.y[n], x, y) ) {
      hit = true;
      break;
    }

  }

  if(hit) {
    var ret = {};
    ret.position = n;

    return ret;
  } else {
    return hit;
  }

}

// should be replaced with isInsidePath() method
self.prototype.hitHandle = function(x0, y0, x1, y1) {

  var r = an.d.RotateGuideCircleR;

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
