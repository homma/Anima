/*
 * @author Daisuke Homma
 */

new function() {  // block

/// modify /////////////////////////////////////////////////////////////////////

var self = Anima.Path;

self.prototype.getBeginPoint = function() {

  var pt = this.edges[0].getAnchorPointZero();
  return pt;

}

self.prototype.getEndPoint = function() {

  var n = this.edges.length - 1;
  var pt = this.edges[n].getAnchorPointOne();
  return pt;

}

/// add edge ///////////////////////////////////////////////////////////////////

self.prototype.addEdge = function(e) {

  if(this.edges.length > 0) {

    // linking the edges
    var len = this.edges.length;
    this.edges[len - 1].next = e;
    e.prev = this.edges[len - 1];

  }

  e.path = this;

  this.edges.push(e);
}

/// remove edge ////////////////////////////////////////////////////////////////

self.prototype.removeEdge = function(edge) {

  for(var i = 0; i < this.edges.length; i++) {

    if(this.edges[i] == edge) {

      // fixes linkage
      if(edge.prev) { edge.prev.next = edge.next; };
      if(edge.next) { edge.next.prev = edge.prev; };

      this.edges.splice(i, 1);
    }

  }

  if(this.edges.length == 0) {
    Anima.Global.editor.removePath(this);
  }

}

self.prototype.removeLastEdge = function() {
  if(this.edges.length > 1) {  // every edge must have at least one element.

    // fix the linkage
    var len = this.edges.length;
    this.edges[len - 1].prev = null;
    this.edges[len - 2].next = null;

    this.edges.pop();
  };
};

/// finish modification ////////////////////////////////////////////////////////

self.prototype.finished = function() {
  this.complete = true;
}

/// clear path /////////////////////////////////////////////////////////////////

self.prototype.clear = function() {
  this.edges = [];
}

/// reverse ////////////////////////////////////////////////////////////////////

self.prototype.reverse = function() {

  var newEdges = [];

  for(var i = 0; i < this.edges.length; i++) {

    var idx = this.edges.length - (i + 1);
    var edg = this.edges[idx];

    var len = newEdges.length;
    if(len > 0) { // linking the edges

      newEdges[len - 1].next = edg;
      edg.prev = newEdges[len - 1];

    }

    newEdges.push(edg);

  }

  this.edges = newEdges;

}

/// duplicate path /////////////////////////////////////////////////////////////

self.prototype.duplicate = function() {

  var newPath = new Anima.Path();

  this.edges.forEach(function(edg) {
    newPath.addEdge( edg.duplicate() );
  });

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

/// backup /////////////////////////////////////////////////////////////////////

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

