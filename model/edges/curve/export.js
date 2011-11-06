/*
 * @author Daisuke Homma
 */

// Cubic Bezier Curve Exporter

Anima.Curve.prototype.dataExport = function() {

  var indent = '          '; // 10
  var str = '{\n' +
    indent + '  "type": "curve",\n' +
    indent + '  "p0x": ' + this.p0x + ',\n' +
    indent + '  "p0y": ' + this.p0y + ',\n' +
    indent + '  "cp0x": ' + this.cp0x + ',\n' +
    indent + '  "cp0y": ' + this.cp0y + ',\n' +
    indent + '  "p1x": ' + this.p1x + ',\n' +
    indent + '  "p1y": ' + this.p1y + ',\n' +
    indent + '  "cp1x": ' + this.cp1x + ',\n' +
    indent + '  "cp1y": ' + this.cp1y + '\n' +
    indent + '}';

  return str;

}

Anima.Curve.prototype.dataImport = function(obj) {

  this.p0x = obj.p0x;
  this.p0y = obj.p0y;
  this.cp0x = obj.cp0x;
  this.cp0y = obj.cp0y;
  this.p1x = obj.p1x;
  this.p1y = obj.p1y;
  this.cp1x = obj.cp1x;
  this.cp1y = obj.cp1y;

}
