/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// draw ///////////////////////////////////////////////////////////////////////

self.prototype.draw = function() {

  this.canvas.clear();  // erase all the pathes before we draw

  ctx = this.canvas.canvas.getContext('2d');

  this.drawPath(ctx);

  this.drawHandle(ctx);
  this.drawResizeGuide(ctx);
  this.drawRotateGuide(ctx);

  this.drawNewPath(ctx);
};

self.prototype.drawPath = function(ctx) {

  for (var i = 0; i < this.pathList.length; i++) {
    var path = this.pathList[i];
    this.pathList[i].drawEdge(ctx);
  }

}

self.prototype.drawNewPath = function(ctx) {

  if(!this.newPath) { return };

  this.newPath.draw(ctx);

}

self.prototype.drawHandle = function() {

  if(this.selectMode != this.SelectModes.transform) { return; };
  if( this.selectedPathList.length == 0) { return; };

  for (var i = 0; i < this.pathList.length; i++) {
    var path = this.pathList[i];
    if(path.selected) {
      path.drawHandle(ctx);
    }
  }
}

self.prototype.drawResizeGuide = function(ctx) {

  if(this.selectMode != this.SelectModes.resize) { return; };
  if( this.selectedPathList.length == 0) { return; };

  ctx.save();

  // surrounding square
  var rect = this.getBoundaryOfSelectedPaths();

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

self.prototype.drawRotateGuide = function(ctx) {

  if(this.selectMode != this.SelectModes.rotate) { return; };
  if( this.selectedPathList.length == 0) { return; };

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

} // block


/// backup /////////////////////////////////////////////////////////////////////

/*

// draw unselected paths first; then draw selected
self.prototype.drawSeparate = function(canvas) {

  canvas.clear();  // erase all the pathes before we draw

  ctx = canvas.canvas.getContext('2d');

  // draw unselected paths behind
  for (var i = 0; i < this.pathList.length; i++) {
    var path = this.pathList[i];
    if( !path.getSelected() ) {
      this.pathList[i].draw(ctx);
    }
  }

  // draw the selected paths front
  for (var i = 0; i < this.pathList.length; i++) {
    var path = this.pathList[i];
    if( path.getSelected() ) {
      this.pathList[i].draw(ctx);
    }
  }

  if(this.newPath) {
    this.newPath.draw(ctx);
  }

}

*/

