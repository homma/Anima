/*
 * @author Daisuke Homma
 */

new function() {  // block

Anima.ResizeMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

  this.ResizeGuideLineStyle = "black";
  this.ResizeGuideFillStyle = "lightgray";
  this.ResizeGuideLineWidth = 0.1;
  this.ResizeGuideCircleR   = 4;

}
var self = Anima.ResizeMode;

self.prototype = new Anima.EditorMode();

/// draw ///////////////////////////////////////////////////////////////////////

// drawing resize guide
self.prototype.drawHandle = function(ctx) {

  if( this.editor.selectedPathList.length == 0) { return; };

  ctx.save();

  // surrounding square
  var rect = this.editor.getBoundaryOfSelectedPaths();

  ctx.lineWidth = this.ResizeGuideLineWidth;
  ctx.strokeStyle = this.ResizeGuideLineStyle;

  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);

  // handle
  var handles = this.getResizeGuideHandles();

  var r = this.ResizeGuideCircleR;
  ctx.fillStyle = this.ResizeGuideFillStyle;

  for(var i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.arc(handles.x[i], handles.y[i], r, 0, Math.PI*2, false);
    ctx.fill();
  }

  ctx.restore();

}

self.prototype.getResizeGuideHandles = function() {

  var rect = this.editor.getBoundaryOfSelectedPaths();
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

/// hittest ////////////////////////////////////////////////////////////////////

self.prototype.isOnHandle = function(x, y) {

  return this.hitTestResizeGuide(x, y);

}

// returns false or position being hit
self.prototype.hitTestResizeGuide = function(x, y) {

  var hit = false;

  // guard
  if( this.editor.selectedPathList.length == 0) { return false; };

  var handles = this.getResizeGuideHandles();

  var i;
  for(i = 0; i < handles.x.length; i++) {

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

  var r = this.ResizeGuideCircleR;

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
