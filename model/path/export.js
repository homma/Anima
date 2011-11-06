/*
 * @author Daisuke Homma
 */

new function() {  // block

/// export and import //////////////////////////////////////////////////////////

var self = Anima.Path;

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
    indent + '  "strokeH": ' + this.getStrokeHue() + ',\n' +
    indent + '  "strokeS": ' + this.getStrokeSaturation() + ',\n' +
    indent + '  "strokeL": ' + this.getStrokeLuminance() + ',\n' +
    indent + '  "strokeA": ' + this.getStrokeAlpha() + ',\n' +
    indent + '  "fillH": ' + this.getFillHue() + ',\n' +
    indent + '  "fillS": ' + this.getFillSaturation() + ',\n' +
    indent + '  "fillL": ' + this.getFillLuminance() + ',\n' +
    indent + '  "fillA": ' + this.getFillAlpha() + ',\n' +
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
  this.setStrokeHue(obj.strokeH);
  this.setStrokeSaturation(obj.strokeS);
  this.setStrokeLuminance(obj.strokeL);
  this.setStrokeAlpha(obj.strokeA);
  this.setFillHue(obj.fillH);
  this.setFillSaturation(obj.fillS);
  this.setFillLuminance(obj.fillL);
  this.setFillAlpha(obj.fillA);

  for(var i = 0; i < obj.edges.length; i++) {

    if(obj.edges[i].type != "curve") continue;

    var curve = new Anima.Curve();
    curve.dataImport(obj.edges[i]);
    this.addEdge(curve);

  }

  this.finished();

}

} // block

