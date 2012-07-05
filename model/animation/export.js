/*
 * @author Daisuke Homma
 */

new function() { // block

var self = an.Animation;

/// export /////////////////////////////////////////////////////////////////////

self.prototype.dataExport = function() {

  var indent = '  '; // 2

  var beginStr = '{\n' +
    indent + '  "type": "animation",\n' +
    indent + '  "framesPerSecond": ' + this.framesPerSecond + ',\n' +
    indent + '  "animationLength": ' + this.animationLength + ',\n' +
    indent + '  "frameWidth": ' + an.g.canvas.width + ',\n' +
    indent + '  "frameHeight": ' + an.g.canvas.height + ',\n' +
    indent + '  "tracks": [ ';

  var midStr = new String();

  for(var i = 0; i < this.trackList.length; i++) {
    midStr += this.trackList[i].dataExport();

    if(this.trackList.length -1 > i) {  // exclude the last element
      midStr += ', ';
    }

  }

  var endStr = ' ]\n' +
    indent + '}';

  var str = beginStr + midStr + endStr;

  return str;
}

/// import /////////////////////////////////////////////////////////////////////

self.prototype.dataImport = function(obj) {

  // console.log("import animation");

  // check
  if(obj.type != "animation") return;  // do nothing

  this.framesPerSecond = obj.framesPerSecond;
  this.animationLength = obj.animationLength;

  for(var i = 0; i < obj.tracks.length; i++) {
    var track = new an.Track();
    track.dataImport(obj.tracks[i]);

    this.addTrack(track);
  }

  an.g.editor.setTrack( this.trackList[0] );
}

} // block
