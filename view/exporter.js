/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.ExporterView = function() {

  Anima.Global.ExporterView = this;

};
var self = Anima.ExporterView;

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

  Anima.Global.Selector.select();

};

self.prototype.dataExport = function() {

  var str = Anima.Global.Exporter.export();

  var exportText = document.getElementById("exportText");
  exportText.value = str;

  exportText.focus();
  exportText.select();

/*
  console.log("ANIMA FILE BEGIN");
  console.log(str);
  console.log("ANIMA FILE END");
*/

}

self.prototype.close = function(e, self) {

  self.deselect();

}

} // block
