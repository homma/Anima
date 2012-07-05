/*
 * @author Daisuke Homma
 */

new function() { // block

an.ExporterView = function() {

  an.g.ExporterView = this;

};
var self = an.ExporterView;

self.prototype.select = function() {

  var self = this;

  var exporterCloseButton = document.getElementById("exportPainClose");
  exporterCloseButton.onclick = function(e){ self.close(e, self); };

  var exportPain = document.getElementById("exportPain");
  exportPain.style.display = "block";

  this.dataExport();

};

self.prototype.deselect = function() {

  var exportPain = document.getElementById("exportPain");
  exportPain.style.display = "none";

  var exportText = document.getElementById("exportText");
  exportText.value = "";

  an.g.Selector.select();

};

self.prototype.dataExport = function() {

  var str = an.g.Exporter.export();

  var exportText = document.getElementById("exportText");
  exportText.value = str;

  exportText.focus();
  exportText.select();

}

self.prototype.close = function(e, self) {

  self.deselect();

}

} // block
