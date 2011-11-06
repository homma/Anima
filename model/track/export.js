/*
 * @author Daisuke Homma
 */

/// track data exporter / importer /////////////////////////////////////////////

new function() { // block

var self = Anima.Track;

self.prototype.dataExport = function() {
  this.selected;
  this.visible;
  this.trackName;

  var indent = '    '; // 4

  var beginStr = '{\n' +
    indent + '  "type": "track",\n' +
    indent + '  "selected": ' + this.selected + ',\n' +
    indent + '  "visible": ' + this.visible + ',\n' +
    indent + '  "trackName": "' + this.trackName + '",\n' +
    indent + '  "timeframes": [ ';

  var midStr = new String();

  for(var i = 0; i < this.frameList.length; i++) {
    midStr += this.frameList[i].dataExport();

    if(this.frameList.length -1 > i) {  // exclude the last element
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
  if(obj.type != "track") return;  // do nothing

  // set attributes
  this.setSelected(obj.selected);
  this.setVisible(obj.visible);
  this.setName(obj.trackName);

  // timeframe import
  this.removeTimeFrameAt(0);  // remove initial timeframe
  for(var i = 0; i < obj.timeframes.length; i++) {
    var timeframe = new Anima.TimeFrame();
    timeframe.dataImport(obj.timeframes[i]);

    this.addTimeFrame(timeframe);
  }

}

} // block

