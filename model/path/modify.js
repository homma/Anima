/*
 * @author Daisuke Homma
 */

new function() {  // block

/// modify /////////////////////////////////////////////////////////////////////

var self = Anima.Path;

self.prototype.getBeginPoint = function() {

  var pt = this.edges[0].getFirstPoint();
  return pt;

}

self.prototype.getEndPoint = function() {

  var n = this.edges.length - 1;
  var pt = this.edges[n].getSecondPoint();
  return pt;

}

self.prototype.addEdge = function(e) {

  if(this.edges.length > 0) {

    // linking the edges
    var len = this.edges.length;
    this.edges[len - 1].next = e;
    e.prev = this.edges[len - 1];

  }

/*
  this.width = 
  this.height = 
*/

  this.edges.push(e);
}

self.prototype.removeLastEdge = function() {
  if(this.edges.length > 1) {  // every edge must have at least one element.
    this.edges.pop();
  };
}

self.prototype.finished = function() {
  this.complete = true;
}

self.prototype.clear = function() {
  this.edges = [];
}

self.prototype.duplicate = function() {

  var newPath = new Anima.Path();

  for(var i = 0; i < this.edges.length; i++) {
    newPath.addEdge( this.edges[i].duplicate() );
  }

  this.duplicateAttributes(this, newPath);

  return newPath;

}

self.prototype.duplicateAttributes = function(from, to) {

  to.complete = from.complete;
  to.closePath = from.closePath;
  to.lineWidth = from.lineWidth;
  to.lineCap = from.lineCap;
  to.lineJoin = from.lineJoin;
  to.miterLimit = from.miterLimit;
  to.fill = from.fill;
  to.fillH = from.fillH;
  to.fillS = from.fillS;
  to.fillL = from.fillL;
  to.fillA = from.fillA;
  to.fillHSLA = from.fillHSLA;
  to.fillStyle = from.fillStyle;
  to.stroke = from.stroke;
  to.strokeH = from.strokeH;
  to.strokeS = from.strokeS;
  to.strokeL = from.strokeL;
  to.strokeA = from.strokeA;
  to.strokeHSLA = from.strokeHSLA;
  to.strokeStyle = from.strokeStyle;
  to.shadowColor = from.shadowColor;
  to.shadowOffsetX = from.shadowOffsetX;
  to.shadowOffsetY = from.shadowOffsetY;
  to.shadowBlur = from.shadowBlur;

}

}  // block

/*  backup

self.prototype.smoothen = function() {
  var len = this.edges.length;
  if(len < 2) return;

  var prev = this.edges[len - 2];
  var last = this.edges[len - 1];

  if( (prev instanceof Anima.Line) && (last instanceof Anima.Curve) ) {
    // console.log("Line => Curve");

    last.cp0x = prev.x + (last.cp1x - last.x);
    last.cp0y = prev.y + (last.cp1y - last.y);

  } else if( (prev instanceof Anima.Curve) && (last instanceof Anima.Curve) ) {
    // console.log("Curve => Curve");

    last.cp0x = prev.x - (prev.cp1x - prev.x);
    last.cp0y = prev.y - (prev.cp1y - prev.y);

  } else if( (prev instanceof Anima.Move) && (last instanceof Anima.Curve) ) {
    // console.log("Move => Curve");

    // last.cp0x = prev.x;
    // last.cp0y = prev.y;
    last.cp0x = prev.x + (last.cp1x - last.x);
    last.cp0y = prev.y + (last.cp1y - last.y);

  } else {
    // console.log("Error: Anima.Path.prototype.smoothen");
  }

  console.log(prev.x, prev.y);
  console.log(last.cp0x + ", " + last.cp0y + ", " +
              last.cp1x + ", " + last.cp1y + ", " +
              last.x + ", " + last.y);

}
*/

