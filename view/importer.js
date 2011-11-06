/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.ImporterView = function() {

  Anima.Global.ImporterView = this;

};
var self = Anima.ImporterView;

self.prototype.select = function() {

  var self = this;

  var importPain = document.getElementById("importPain");
  importPain.style.display = "block";

  var importerCloseButton = document.getElementById("importPainClose");
  importerCloseButton.onclick = function(e){ self.close(e, self); };

  var importButton = document.getElementById("importerExecuteButton");
  importButton.onclick = function(e){ self.dataImport(e, self); };

  var importText = document.getElementById("importText");
  importText.focus();

};

self.prototype.deselect = function() {

  var importPain = document.getElementById("importPain");
  importPain.style.display = "none";

  var importText = document.getElementById("importText");
  importText.value = "";

  Anima.Global.Selector.select();

};

self.prototype.dataImport = function() {

  var importText = document.getElementById("importText");
  var str = importText.value;

  var obj = JSON.parse(str);

  Anima.Global.Importer.import(obj);

  Anima.Global.editor.draw();
  Anima.Global.TrackView.updateView();

};

self.prototype.close = function(e, self) {

  self.deselect();

};

} // block

