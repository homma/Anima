/*
 * @author Daisuke Homma
 */

/// track data exporter / importer /////////////////////////////////////////////

new function() { // block

var self = Anima.TimeFrame;

self.prototype.dataExport = function() {

  var indent = '      '; // 6
  var beginStr = '{\n' +
    indent + '  "type": "frame",\n' +
    indent + '  "number": ' + this.frameNumber + ',\n' +
    indent + '  "pathList": [ ';

  var midStr = new String();

  for(var i = 0; i < this.pathList.length; i++) {
    midStr += this.pathList[i].dataExport();

    if(this.pathList.length - 1 > i) {  // exclude the last element
      midStr += ', ';
    }

  }

  var endStr = ' ]\n' +
    indent + '}';

  var str = beginStr + midStr + endStr;

  return str;

}

self.prototype.dataImport = function(obj) {

  // check
  if(obj.type != "frame") return;  // do nothing

  // set attributes
  this.setFrameNumber(obj.number);

  // path import
  for(var i = 0; i < obj.pathList.length; i++) {
    var path = new Anima.Path();
    path.dataImport(obj.pathList[i]);

    this.addPath(path);
  }

}

} // block

