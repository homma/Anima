/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// hittest ////////////////////////////////////////////////////////////////////

// returns a path if hit
self.prototype._onPath = function(x, y) {

  var path = null;
  var ctx = this.canvas.canvas.getContext('2d');

  for(var i = 0; i < this.pathList.length; i++) {
    if( this.pathList[i].onPath(ctx, x, y) ) {
      path = this.pathList[i];
      break;
    }
  }

  return path;

}

self.prototype._inPath = function(x, y) {

  var path = null;

  path = this._onPath(x, y);
  if( path ) { return path; };

  var ctx = this.canvas.canvas.getContext('2d');

  for(var i = 0; i < this.pathList.length; i++) {
    if( this.pathList[i].isPointInPath(ctx, x, y) ) {
      path = this.pathList[i];
      break;
    }
  }

  return path;

}

// returns an edge if hit the modification handles
self.prototype._isOnHandle = function(x, y) {

  var hitEdge = null;
  var ctx = this.canvas.canvas.getContext('2d');

  // guard
  if(this.selectMode != this.SelectModes.transform) { return hitEdge; };
  if( this.pathList.length == 0 ) { return hitEdge; };

  for (var i = 0; i < this.pathList.length; i++) {
    hitEdge = this.pathList[i].isOnHandle(ctx, x, y);

    if(hitEdge) break;
  }

  return hitEdge;
}

// returns an edge if hit
self.prototype._isOnAnchorPoints = function(x, y) {

  var hitEdge = null;

  // guard
  if(this.selectMode != this.SelectModes.transform) { return hitEdge; };
  if( this.pathList.length == 0 ) { return hitEdge; };

  var ctx = this.canvas.canvas.getContext('2d');

  for (var i = 0; i < this.pathList.length; i++) {
    hitEdge = this.pathList[i].isOnAnchorPoints(ctx, x, y);
    if(hitEdge) break;
  }

  return hitEdge;
}

// returns false or position being hit
self.prototype._hitTestResizeGuide = function(x, y) {

  var hit = false;

  // guard
  if(this.selectMode != this.SelectModes.resize) { return false; };
  if( this.selectedPathList.length == 0) { return false; };

  var handles = this.getResizeGuideHandles();

  var i;
  for(i = 0; i < handles.x.length; i++) {

    if( this._hitHandle(handles.x[i], handles.y[i], x, y) ) {
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

// returns boolean or handles and position where is hit
self.prototype._hitTestRotateHandle = function(x, y) {

  var hit = false;

  // guard
  if(this.selectMode != this.SelectModes.rotate) { return hit; };
  if( this.selectedPathList.length == 0) { return hit; };

  var handles = this.getRotateGuideHandles();

  // starts from 1 because handles.x[0] is not actually a handle.
  var i;
  for(i = 1; i < handles.x.length; i++) {

    if( this._hitHandle(handles.x[i], handles.y[i], x, y) ) {
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

self.prototype._hitHandle = function(x0, y0, x1, y1) {

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

