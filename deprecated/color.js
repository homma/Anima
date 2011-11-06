/*
 * @author Daisuke Homma
 */

// Color utilities

// Red, Green Blue => Hue, Saturation, Value
Anima.Util.rgb2hsv = function(red, green, blue) {

  console.log("rgb2hsv");
  console.log("input: " + red + ", " + green + ", " + blue);

  var r, g, b;
  var max, min;
  var h, s, v;

  r = red / 255;
  g = green / 255;
  b = blue / 255;

  console.log("rgb: " + r + ", " + g + ", " + b);

  max = Math.max(r, g, b);
  min = Math.min(r, g, b);

  if(max == 0) {
    h = 0;
    s = 0;
    v = 0;

    return { h: h, h: s, v: v };
  }

  if(max == min) {
    h = 0;
    s = 0;
    v = max;

    return { h: h, h: s, v: v };
  }

  if(max == r) {
    h = 60 * (g - b) / (max - min);
    s = (max - min) / max;
    v = max;
  } else if (max == g) {
    h = 60 * (b - r) / (max - min) + 120;
    s = (max - min) / max;
    v = max;
  } else {
    h = 60 * (r - g) / (max - min) + 240;
    s = (max - min) / max;
    v = max;
  }

  console.log("hsv: " + h + ", " + s + ", " + v);

  h = h % 360;
  if(h < 0) h += 360;

  console.log("hsv: " + h + ", " + s + ", " + v);

  return { h: h, s: s, v: v };
}

// Hue, Saturation, Value => Red, Green, Blue
Anima.Util.hsv2rgb = function(h, s, v) {

  console.log("hsv2rgb");
  console.log("input: " + h + ", " + s + ", " + v);

  // sav : saturation * value
  // slc : second largest component of RGB
  // mtc : match value : value - saturation * value
  var sav, hue, slc, mtc;
  var r, g, b;

  sav = s * v;
  hue = (h / 60) % 6;
  slc = sav * (1 - Math.abs(hue % 2 - 1));
  mtc = v - sav;

  sav += mtc;
  slc += mtc;

  console.log("hue: " + hue);
  console.log("sav: " + sav);
  console.log("slc: " + slc);
  console.log("mtc: " + mtc);

  sav *= 255;
  slc *= 255;
  mtc *= 255;

  if( hue < 1 ) {
    r = sav;
    g = slc;
    b = mtc;
  } else if( hue < 2 ) {
    r = slc;
    g = sav;
    b = mtc;
  } else if( hue < 3 ) {
    r = mtc;
    g = sav;
    b = slc;
  } else if( hue < 4 ) {
    r = mtc;
    g = slc;
    b = sav;
  } else if( hue < 5 ) {
    r = slc;
    g = mtc;
    b = sav;
  } else if( hue < 6 ) {
    r = sav;
    g = mtc;
    b = slc;
  } else {
    r = 0;
    g = 0;
    b = 0;
  }

  console.log("rgb: " + r + ", " + g + ", " + b);

  return { r: r, g: g, b: b };
}

Anima.Util.testColorConversion = function() {

  // RGB test
  var rgb = Anima.Util.hsv2rgb(0, 0, 1);
  console.log("r: " + rgb.r + " g: " + rgb.g + " b: " + rgb.b);

  var rgb = Anima.Util.hsv2rgb(0, 1, 1);
  console.log("r: " + rgb.r + " g: " + rgb.g + " b: " + rgb.b);

  var rgb = Anima.Util.hsv2rgb(60, 1, 1);
  console.log("r: " + rgb.r + " g: " + rgb.g + " b: " + rgb.b);

  var rgb = Anima.Util.hsv2rgb(120, 1, 1);
  console.log("r: " + rgb.r + " g: " + rgb.g + " b: " + rgb.b);

  var rgb = Anima.Util.hsv2rgb(180, 1, 1);
  console.log("r: " + rgb.r + " g: " + rgb.g + " b: " + rgb.b);

  var rgb = Anima.Util.hsv2rgb(240, 1, 1);
  console.log("r: " + rgb.r + " g: " + rgb.g + " b: " + rgb.b);

  var rgb = Anima.Util.hsv2rgb(300, 1, 1);
  console.log("r: " + rgb.r + " g: " + rgb.g + " b: " + rgb.b);

  var rgb = Anima.Util.hsv2rgb(360, 1, 1);
  console.log("r: " + rgb.r + " g: " + rgb.g + " b: " + rgb.b);

  // HSV test
  var hsv = Anima.Util.rgb2hsv(0xFF, 0x00, 0x00);
  console.log("h: " + hsv.h + " s: " + hsv.s + " v: " + hsv.v);

  var hsv = Anima.Util.rgb2hsv(0xFF, 0xFF, 0x00);
  console.log("h: " + hsv.h + " s: " + hsv.s + " v: " + hsv.v);

  var hsv = Anima.Util.rgb2hsv(0xFF, 0x00, 0xFF);
  console.log("h: " + hsv.h + " s: " + hsv.s + " v: " + hsv.v);

  var hsv = Anima.Util.rgb2hsv(0x33, 0x00, 0x00);
  console.log("h: " + hsv.h + " s: " + hsv.s + " v: " + hsv.v);

}

