/*
 * @author Daisuke Homma
 */

new function() { // block

Anima.Color = function(hue, sat, lum, alp) {

  this.hue = hue || 0;
  this.sat = sat || 100;
  this.lum = lum || 0;
  this.alp = alp || 1;

  this.hsla = null;
  this.updateColor();

}
var self = Anima.Color;

self.prototype.updateColor = function() {

  this.hsla = "hsla(" + this.hue + "," + this.sat + "%," +
                   this.lum + "%," + this.alp + ")"

}

self.prototype.getColor = function() {
  this.updateColor();
  return this.hsla;
}

self.prototype.setHue        = function(h) { this.hue = h; }
self.prototype.getHue        = function()  { return this.hue; }
self.prototype.setSaturation = function(s) { this.sat = s; }
self.prototype.getSaturation = function()  { return this.sat; }
self.prototype.setLuminance  = function(l) { this.lum = l; }
self.prototype.getLuminance  = function()  { return this.lum; }
self.prototype.setAlpha      = function(a) { this.alp = a; }
self.prototype.getAlpha      = function()  { return this.alp; }

self.prototype.isSame = function(other) {
  hsla0 = this.getColor();
  hsla1 = other.getColor();

  if( hsla0 == hsla1 ) { return true; };

  return false;
}

self.prototype.export = function(indent) {

  var str = '{\n' +
    indent + '  "type": "color",\n' +
    indent + '  "hue": '        + this.hue + ',\n' +
    indent + '  "saturation": ' + this.sat + ',\n' +
    indent + '  "luminance": '  + this.lum + ',\n' +
    indent + '  "alpha": '      + this.alp + ',\n' +
    indent + '}';

  return  str;

}

self.prototype.import = function(obj) {

  if(obj.type != "color") return; // not a color object

  this.setHue(obj.hue);
  this.setSaturation(obj.saturation);
  this.setLuminance(obj.luminance);
  this.setAlpha(obj.alpha);
  this.updateColor();

}

} // block
