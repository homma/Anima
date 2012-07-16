/*
 * @author Daisuke Homma
 */

new function() { // block

an.RasterizerView = function() {

  an.g.RasterizerView = this;

};
var self = an.RasterizerView;

self.prototype.select = function() {

  var self = this;

  var rasterizerCloseButton = document.getElementById("rasterPainClose");
  rasterizerCloseButton.onclick = function(e){ self.close(e, self); };

  var rasterPain = document.getElementById("rasterPain");
  rasterPain.style.display = "block";

  this.displayImage();

};

self.prototype.deselect = function() {

  var rasterPain = document.getElementById("rasterPain");
  rasterPain.style.display = "none";

};

self.prototype.displayImage = function() {

  var imgElem = document.getElementById("rasterImage");
  var canvas = an.g.canvas.canvas;
  var image = canvas.toDataURL();

  imgElem.src = image;

};

self.prototype.close = function(e, self) {

  self.deselect();

};

} // block
