/*
 * @author Daisuke Homma
 */

new function() {  // block

an.ResizeMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

  this.name = "ResizeMode";

}
var self = an.ResizeMode;

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

// drawing resize guide
self.prototype.drawHandle = function(ctx) {

  if( this.editor.selectedPathList.length == 0) { return; };

  ctx.save();

  // surrounding square
  var rect = this.editor.getBoundaryOfSelectedPaths();

  ctx.lineWidth = an.d.ResizeGuideLineWidth;
  ctx.strokeStyle = an.d.ResizeGuideLineStyle;

  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);

  // handle
  var handles = this.getResizeHandles();

  var r = an.d.ResizeGuideCircleR;
  ctx.fillStyle = an.d.ResizeGuideFillStyle;

  // Resize Handle starts from 1; see const.js
  for(var i = 1; i < handles.x.length; i++) {
    ctx.beginPath();
    ctx.arc(handles.x[i], handles.y[i], r, 0, Math.PI*2, false);
    ctx.fill();
  }

  ctx.restore();

}

self.prototype.getResizeHandles = function() {

  var rect = this.editor.getBoundaryOfSelectedPaths();
  var ret = {};

  // handle
  var x = new Array();
  var y = new Array();
  x[an.k.NW] = rect.x;
  y[an.k.NW] = rect.y;
  x[an.k.SW] = rect.x;
  y[an.k.SW] = rect.y + rect.h;
  x[an.k.SE] = rect.x + rect.w;
  y[an.k.SE] = rect.y + rect.h;
  x[an.k.NE] = rect.x + rect.w;
  y[an.k.NE] = rect.y;
  x[an.k.W] = rect.x;
  y[an.k.W] = rect.y + rect.h / 2;
  x[an.k.S] = rect.x + rect.w / 2;
  y[an.k.S] = rect.y + rect.h;
  x[an.k.E] = rect.x + rect.w;
  y[an.k.E] = rect.y + rect.h / 2;
  x[an.k.N] = rect.x + rect.w / 2;
  y[an.k.N] = rect.y;

  ret.x = x;
  ret.y = y;

  return ret;
}

/// hittest ////////////////////////////////////////////////////////////////////

self.prototype.isOnHandle = function(x, y) {

  return this.hitTestResizeGuide(x, y);

}

// returns false or position being hit
self.prototype.hitTestResizeGuide = function(x, y) {

  var hit = false;

  // guard
  if( this.editor.selectedPathList.length == 0) { return false; };

  var handles = this.getResizeHandles();

  var i;
  for(i = 1; i < handles.x.length; i++) {
    // Resize Handle starts from 1; see const.js

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
    return false;
  }

}

// should be replaced with isInsidePath() method
self.prototype.hitHandle = function(x0, y0, x1, y1) {

  var r = an.d.ResizeGuideCircleR;

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
