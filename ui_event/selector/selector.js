/*
 * @author Daisuke Homma
 */

new function() {  // block start

Anima.Selector = function(){

  this.state = {};

  Anima.Global.Selector = this;

};
var self = Anima.Selector;

// inherit from Anima.EventState
self.prototype = new Anima.EventState();

self.prototype.select = function() {

  this.selectSelf();

}

self.prototype.deselect = function() {

  // delete handlers
  Anima.Global.editor.deselectAll();
  Anima.Global.editor.draw();

  // nullify all event handler
  this.deselectSelf();

}

self.prototype.onMouseDown = function(e) {

  var eventObj;

  // let the current handler do its job.
  eventObj = Anima.Global.PathInspector.getPathOps();
  if( eventObj.test(e) ) { return; };

  // select or move path
  eventObj = Anima.Global.PathMover;
  if( eventObj.test(e) ) { return; };

  // otherwise deselect
  Anima.Global.editor.deselectAll();
  Anima.Global.editor.draw();
  Anima.Global.pathInspectorView.update();  // update the path info pane

};

}  // block end
