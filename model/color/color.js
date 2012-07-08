/*
 * @author Daisuke Homma
 */

new function() { // block

an.Color = function(hue, sat, lum, alp) {

  this.hue = hue || 0;
  this.sat = sat || 100;
  this.lum = lum || 0;
  this.alp = alp || 1;

  this.hsla = null;
  this.update();

}
var self = an.Color;

self.prototype.update = function() {

  this.hsla = "hsla(" + this.hue + "," + this.sat + "%," +
                   this.lum + "%," + this.alp + ")"

}

self.prototype.getColor = function() {
  this.update();
  return this.hsla;
}

self.prototype.setHue        = function(h) { this.hue = h; this.update(); }
self.prototype.getHue        = function()  { return this.hue; }
self.prototype.setSaturation = function(s) { this.sat = s; this.update(); }
self.prototype.getSaturation = function()  { return this.sat; }
self.prototype.setLuminance  = function(l) { this.lum = l; this.update(); }
self.prototype.getLuminance  = function()  { return this.lum; }
self.prototype.setAlpha      = function(a) { this.alp = a; this.update(); }
self.prototype.getAlpha      = function()  { return this.alp; }

self.prototype.isSame = function(other) {
  hsla0 = this.getColor();
  hsla1 = other.getColor();

  if( hsla0 == hsla1 ) { return true; };

  return false;
}

self.prototype.duplicate = function() {

  var ret = new an.Color();
  ret.setHue( this.getHue() );
  ret.setSaturation( this.getSaturation() );
  ret.setLuminance( this.getLuminance() );
  ret.setAlpha( this.getAlpha() );
  ret.update();

  return ret;

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

}

} // block
