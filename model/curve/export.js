/*
 * @author Daisuke Homma
 */

// Cubic Bezier Curve Exporter

an.Curve.prototype.dataExport = function() {

  var indent = '          '; // 10
  var str = '{\n' +
    indent + '  "type": "curve",\n' +
    indent + '  "p0x": ' + this.p0x + ',\n' +
    indent + '  "p0y": ' + this.p0y + ',\n' +
    indent + '  "c0x": ' + this.c0x + ',\n' +
    indent + '  "c0y": ' + this.c0y + ',\n' +
    indent + '  "p1x": ' + this.p1x + ',\n' +
    indent + '  "p1y": ' + this.p1y + ',\n' +
    indent + '  "c1x": ' + this.c1x + ',\n' +
    indent + '  "c1y": ' + this.c1y + ',\n' +
    indent + '  "smoothConnect": ' + this.smoothConnect + '\n' +
    indent + '}';

  return str;

}

an.Curve.prototype.dataImport = function(obj) {

  this.p0x = obj.p0x;
  this.p0y = obj.p0y;
  this.c0x = obj.c0x;
  this.c0y = obj.c0y;
  this.p1x = obj.p1x;
  this.p1y = obj.p1y;
  this.c1x = obj.c1x;
  this.c1y = obj.c1y;
  this.smoothConnect = obj.smoothConnect;

}
