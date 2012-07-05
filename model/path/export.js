/*
 * @author Daisuke Homma
 */

new function() {  // block

/// export and import //////////////////////////////////////////////////////////

var self = an.Path;

self.prototype.dataExport = function() {

  var indent = '        '; // 8

  var beginStr = '{\n' +
    indent + '  "type": "path",\n' +
    indent + '  "lineWidth": ' + this.getLineWidth() + ',\n' +
    indent + '  "lineCap": "' + this.getLineCap() + '",\n' +
    indent + '  "lineJoin": "' + this.getLineJoin() + '",\n' +
    indent + '  "miterLimit": ' + this.getMiterLimit() + ',\n' +
    indent + '  "closePath": ' + this.getClosePath() + ',\n' +
    indent + '  "stroke": ' + this.getStroke() + ',\n' +
    indent + '  "fill": ' + this.getFill() + ',\n' +
    indent + '  "strokeH": ' + this.strokeColor.getHue() + ',\n' +
    indent + '  "strokeS": ' + this.strokeColor.getSaturation() + ',\n' +
    indent + '  "strokeL": ' + this.strokeColor.getLuminance() + ',\n' +
    indent + '  "strokeA": ' + this.strokeColor.getAlpha() + ',\n' +
    indent + '  "fillH": ' + this.fillColor.getHue() + ',\n' +
    indent + '  "fillS": ' + this.fillColor.getSaturation() + ',\n' +
    indent + '  "fillL": ' + this.fillColor.getLuminance() + ',\n' +
    indent + '  "fillA": ' + this.fillColor.getAlpha() + ',\n' +
    indent + '  "edges": [ ';

  var midStr = new String();

  for (var i = 0; this.edges.length > i; i++) {
    midStr += this.edges[i].dataExport();

    if(this.edges.length - 1 > i) {  // exclude the last element
      midStr += ", ";
    }

  }

  var endStr = ' ]\n' +
    indent + '}';

  var str = beginStr + midStr + endStr;

  return str;

}

self.prototype.dataImport = function(obj) {

  if(obj.type != "path") return; // error : do nothing

  this.setLineWidth(obj.lineWidth);
  this.setLineCap(obj.lineCap);
  this.setLineJoin(obj.lineJoin);
  this.setMiterLimit(obj.miterLimit);
  this.setClosePath(obj.closePath);
  this.setStroke(obj.stroke);
  this.setFill(obj.fill);
  this.strokeColor.setHue(obj.strokeH);
  this.strokeColor.setSaturation(obj.strokeS);
  this.strokeColor.setLuminance(obj.strokeL);
  this.strokeColor.setAlpha(obj.strokeA);
  this.fillColor.setHue(obj.fillH);
  this.fillColor.setSaturation(obj.fillS);
  this.fillColor.setLuminance(obj.fillL);
  this.fillColor.setAlpha(obj.fillA);

  for(var i = 0; i < obj.edges.length; i++) {

    if(obj.edges[i].type != "curve") continue;

    var curve = new an.Curve();
    curve.dataImport(obj.edges[i]);
    this.addEdge(curve);

  }

  this.finished();

}

} // block

