/*
 * @author Daisuke Homma
 */

new function() {  // block

an.Exporter = function() {

  an.g.Exporter = this;
}

var self = an.Exporter;

self.prototype.export = function() {

  var beginStr = '{\n' +
    '  "type": "ANIMA",\n' +
    '  "version": 0,\n' +  // file format version
    '  "animation": ';

  var midStr = new String();

  // ask animation to export
  var midStr = an.g.animation.dataExport();

  var endStr = ' \n}';

  var str = beginStr + midStr + endStr;

  return str;

}

} // block

