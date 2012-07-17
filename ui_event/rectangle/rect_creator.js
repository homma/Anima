/**
 * @fileOverview rectangle creator
 * @author Daisuke Homma
 */

new function() {  // block

an.RectangleCreator = function() {

  an.g.RectangleCreator = this;

  this.on;
  this.x;
  this.y;
  this.width;
  this.height;
  this.hasRect;

  this.initialize();

}

var self = an.RectangleCreator;

// inherit from an.EventState
self.prototype = new an.EventState();

self.prototype.initialize = function() {

  this.on = false;
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.hasRect = false;

  an.g.editor.deselectAll();

}

self.prototype.select = function() {

  an.g.editor.setEditorMode(an.g.editor.EditorModes.rectangle);
  this.selectSelf();

}

self.prototype.deselect = function() {

  this.initialize();
  this.deselectSelf();

}

self.prototype.onMouseDown = function(e) {

  var position = an.u.getMousePositionInCanvas(e);
  this.x = position.x;
  this.y = position.y;
  this.width = 0;
  this.height = 0;

  this.on = true;

//  an.g.editor.createRectangle(this.x, this.y, 100, 100);
//  an.g.editor.draw();

}

self.prototype.onMouseMove = function(e) {

  if( !this.on ) { return; }

  if( ! this.hasRect ) {

    var position = an.u.getMousePositionInCanvas(e);
    this.width = 10;
    this.height = 10;

    this.createRectangle();

  } else {

    this.moveRectangle(e);

  }

  an.g.editor.draw();

}

self.prototype.onMouseUp = function(e) {

  if( !this.on ) { return; }

  this.moveRectangle(e);

  this.initialize();
  an.g.editor.draw();

}

self.prototype.createRectangle = function() {

  var fx, fy, fw, fh;

  if( this.width >= 0 ) {

    fx = this.x;
    fw = this.width;

  } else {

    fx = this.x + this.width;
    fw = -this.width;

  }

  if( this.height >= 0 ) {

    fy = this.y;
    fh = this.height;

  } else {

    fy = this.y + this.height;
    fh = -this.height;

  }

  an.g.editor.createRectangle(fx, fy, fw, fh);
  this.hasRect = true;

}

self.prototype.moveRectangle = function(e) {

  var position = an.u.getMousePositionInCanvas(e);

  // old width, height
  var ow = this.width;
  var oh = this.height;

  // new width, height
  var nw = position.x - this.x;
  var nh = position.y - this.y;

  this.width = nw;
  this.height = nh;

  if( ( nw < 0 ) || ( nw < 0 ) ) {

    an.g.editor.translateSelectedPaths(position.x, position.y);
    an.g.editor.resizeSelectedPaths(this.x, this.y, nw / ow, nh / oh);

  } else {

    an.g.editor.resizeSelectedPaths(this.x, this.y, nw / ow, nh / oh);
    // an.g.editor.scaleSelectedPaths(nw / ow, nh / oh);
    // console.log("ow: " + ow + " oh: " + oh);
    // console.log("nw: " + nw + " nh: " + nh);
    // console.log("sw: " + nw / ow + " sh: " + nh / oh);

  }

}

} // block
