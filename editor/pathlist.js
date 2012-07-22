/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = an.Editor;

/// modify current path ////////////////////////////////////////////////////////

/**
 * @description add a path to path list
 */
self.prototype.addPath = function(p) {

  this.pathList.push(p);

}

self.prototype.getNewPath = function() {

  return this.newPath;

}

self.prototype.setNewPath = function(p) {

  this.newPath = p;

}

/**
 * @description remove a path from path list
 */
self.prototype.removePath = function(p) {

  this.deselectPath(p);

  var idx = this.pathList.indexOf(p);
  this.pathList.splice(idx , 1);

/*
  for(var i = 0; i < this.pathList.length; i++) {

    if(this.pathList[i] == p) {
      this.pathList.splice(i , 1);
    }
  }
*/

}

///////////////////////////////////////
// shape

/**
 * @description create a shape
 * @param {Number} x x coordinate of left top corner of new shape
 * @param {Number} y y coordinate of left top corner of new shape
 * @param {Number} w width of new shape
 * @param {Number} h height of new shape
 * @retuns {Path} newly created path (returns just for undo)
 */
self.prototype.createShape = function(x, y, w, h) {

  return this.editorMode.createShape(x, y, w, h);

}

} // block

