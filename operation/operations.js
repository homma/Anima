/*
 * @author Daisuke Homma
 */

// Global Operations

new function() {  // block

Anima.Operations = function() {
  Anima.Global.operations = this;
};
self = Anima.Operations;

self.prototype.selectAll = function() {

  Anima.Global.editor.selectAll();
  Anima.Global.editor.draw();

}

self.prototype.clear = function() {

  Anima.Global.editor.deleteAll();
  Anima.Global.editor.draw();

}

self.prototype.delete = function() {

  Anima.Global.editor.delete();
  Anima.Global.editor.draw();

}

self.prototype.cut = function() {

  Anima.Global.editor.cut();
  Anima.Global.editor.draw();

}

self.prototype.copy = function() {

  Anima.Global.editor.copy();
  Anima.Global.editor.draw();

}

self.prototype.paste = function() {

  Anima.Global.editor.paste();
  Anima.Global.editor.draw();

}

self.prototype.undo = function() {
  Anima.Global.undoManager.undo();
  Anima.Global.editor.draw();
}

self.prototype.redo = function() {
  Anima.Global.undoManager.redo();
  Anima.Global.editor.draw();
}

self.prototype.save = function() {

  localStorage.setItem("Anima.save", Anima.Global.Exporter.export() );

}

self.prototype.restore = function() {

  var dat = localStorage.getItem("Anima.save");
  // localStorage.clear();

  if(dat == null) return;

  var obj = JSON.parse(dat);

  Anima.Global.Importer.import(obj);

  Anima.Global.editor.draw();
  Anima.Global.TrackView.updateView();

}

} // block end

