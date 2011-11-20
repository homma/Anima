/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// hittest ////////////////////////////////////////////////////////////////////

// returns a path if hit
self.prototype.hitTest = function(x, y) {

  var path = null;

  for(var i = 0; i < this.pathList.length; i++) {
    if(this.pathList[i].hitTest(x, y)) {
      path = this.pathList[i];
      break;
    }
  }
  return path;

}

// returns an edge if hit the modification handles
self.prototype.hitTestHandle = function(x, y) {

  var hitEdge = null;

  // guard
  if(this.selectMode != this.SelectModes.transform) { return hitEdge; };
  if( this.pathList.length == 0 ) { return hitEdge; };

  for (var i = 0; i < this.pathList.length; i++) {
    hitEdge = this.pathList[i].hitTestHandle(x, y);

    if(hitEdge) break;
  }

  return hitEdge;
}

// returns an edge if hit
self.prototype.hitTestAnchorPoint = function(x, y) {

  var hitEdge = null;

  // guard
  if(this.selectMode != this.SelectModes.transform) { return hitEdge; };
  if( this.pathList.length == 0 ) { return hitEdge; };

  for (var i = 0; i < this.pathList.length; i++) {
    hitEdge = this.pathList[i].hitTestAnchorPoint(x, y);

    if(hitEdge) break;
  }

  return hitEdge;
}

// returns boolean or handles and position where is hit
self.prototype.hitTestResizeGuide = function(x, y) {

  var hit = false;

  // guard
  if(this.selectMode != this.SelectModes.resize) { return hit; };
  if( this.selectedPathList.length == 0) { return hit; };

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
    return hit;
  }

}

// returns boolean or handles and position where is hit
self.prototype.hitTestRotateHandle = function(x, y) {

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

////////////////// Backup //////////////////////////////////////////////////////

/* obsolete
// automatically adding the path to selected path list.
self.prototype.hitTestAndAdd = function(x, y) {

  var path = null;

  for(var i = 0; i < this.pathList.length; i++) {

    if(this.pathList[i].hitTest(x, y)) {
      this.selectPath(this.pathList[i]);
      path = this.pathList[i];
      break;
    }
  }
  return path;

}

self.prototype.hitTestToPickupOne = function(x, y) {

  this.deselectAll();

  var hit = false;

  for(var i = 0; i < this.pathList.length; i++) {

    // only one path can be hit.
    if(hit) {
      this.deselectPath(this.pathList[i]);
      continue;
    }

    if(this.pathList[i].hitTest(x, y)) {
      this.selectPath(this.pathList[i]);
      hit = true;
    } else {
      this.deselectPath(this.pathList[i]);
    }
  }

  return hit;
}
*/

