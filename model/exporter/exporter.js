/*
 * @author Daisuke Homma
 */

new function() {  // block

Anima.Exporter = function() {

  Anima.Global.Exporter = this;
}

var self = Anima.Exporter;

self.prototype.export = function() {

  var beginStr = '{\n' +
    '  "type": "ANIMA",\n' +
    '  "version": 0,\n' +  // file format version
    '  "animation": ';

  var midStr = new String();

  // ask animation to export
  var midStr = Anima.Global.animation.dataExport();

  var endStr = ' \n}';

  var str = beginStr + midStr + endStr;

  return str;

}

} // block

