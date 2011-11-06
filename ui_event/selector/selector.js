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
  this.disableAllHandlers();

}

self.prototype.onMouseDown = function(e) {

  var position = Anima.Util.getMousePositionInCanvas(e);
  var x = position.x;
  var y = position.y;

  // hit test (resize guide)
  var hitResizeGuide = Anima.Global.editor.hitTestResizeGuide(x, y);
  if(hitResizeGuide) {

    Anima.Global.PathResizer.select(hitResizeGuide);
    return;

  }

  // hit test (rotate handle)
  // var hitRotateHandle = Anima.Global.editor.hitTestRotateHandle(x, y);
  // if(hitRotateHandle) {
    // do something.
  // }

  // hit test (transform handle)
  var hitEdge = Anima.Global.editor.hitTestHandle(x, y);
  if(hitEdge) {

    Anima.Global.CurveModifier.select(hitEdge);
    return;

  }

  // hit test (path for move)
  var hitPath = Anima.Global.editor.hitTest(x, y);
  if(hitPath) {

    var selectedAlready = false;
    if( hitPath.getSelected() ) {
      selectedAlready = true;
    }

    Anima.Global.editor.selectPath(hitPath);
    Anima.Global.pathInspectorView.update();  // update the path info pane
    Anima.Global.editor.draw();

    if(selectedAlready) {
      Anima.Global.PathMover.select(x, y, true, hitPath);
    } else {
      Anima.Global.PathMover.select(x, y, false, null);
    }

    return;
  }

  // otherwise
  Anima.Global.editor.deselectAll();
  Anima.Global.editor.draw();
  Anima.Global.pathInspectorView.update();  // update the path info pane

};

}  // block end
