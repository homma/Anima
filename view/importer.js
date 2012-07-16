/*
 * @author Daisuke Homma
 */

new function() { // block

an.ImporterView = function() {

  an.g.ImporterView = this;

};
var self = an.ImporterView;

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

};

self.prototype.dataImport = function() {

  var importText = document.getElementById("importText");
  var str = importText.value;

  var obj = JSON.parse(str);

  an.g.Importer.import(obj);

  an.g.editor.draw();
  an.g.TrackView.updateView();

};

self.prototype.close = function(e, self) {

  self.deselect();

};

} // block

