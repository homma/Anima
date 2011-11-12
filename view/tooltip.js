/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.Tooltip = function() {

  this.init();
  Anima.Global.Tooltip = this;

};
var self = Anima.Tooltip;

self.prototype.bind = function(id, text) {

  var tooltip = document.getElementById("tooltip");
  var elem = document.getElementById(id);

  var fun = function(e) {
    tooltip.style.display = "block";
    tooltip.style.top  = e.clientY + 20 + "px";
    tooltip.style.left = e.clientX + 20 + "px";
    tooltip.innerText = text;
  };

  var disable = function(e) {
    tooltip.style.display = "none";
  };

  elem.onmousemove = fun;
  elem.onmouseout  = disable;

}

self.prototype.init = function() {

  var tips = [
    { id: "stroke_color", text: "click to stock" },
    { id: "fill_color",   text: "click to stock" },
  ];

  for(var i = 0; i < tips.length; i++) {
    var tip = tips[i];
    this.bind(tip.id, tip.text);
  }

}

} // block
