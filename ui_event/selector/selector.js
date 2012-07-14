/*
 * @author Daisuke Homma
 */

new function() {  // block start

an.Selector = function(){

  this.state = {};

  an.g.Selector = this;

};
var self = an.Selector;

// inherit from an.EventState
self.prototype = new an.EventState();

self.prototype.select = function() {

  an.g.PathOp.selectTransform();
  this.selectSelf();

}

self.prototype.deselect = function() {

  // delete handlers
  an.g.editor.deselectAll();
  an.g.editor.draw();

  // nullify all event handler
  this.deselectSelf();

}

self.prototype.onMouseDown = function(e) {

  var eventObj;

  // let the current handler do its job.
  eventObj = an.g.PathOp.getPathOps();
  if( eventObj.test(e) ) { return; };

  // select or move path
  eventObj = an.g.PathMover;
  if( eventObj.test(e) ) { return; };

  // otherwise deselect
  an.g.editor.deselectAll();
  an.g.editor.draw();
  an.g.pathInspectorView.update();  // update the path info pane

};

}  // block end
