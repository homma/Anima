/*
 * @author Daisuke Homma
 */

new function() {  // block

/// modify /////////////////////////////////////////////////////////////////////

var self = an.Path;

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
    an.g.editor.removePath(this);
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
    var edg = this.edges[idx].reverse();

    var len = newEdges.length;
    if(len > 0) { // linking the edges

      newEdges[len - 1].next = edg;
      edg.prev = newEdges[len - 1];

    }

    newEdges.push(edg);

  }

  this.edges = newEdges;

}

/// append a path //////////////////////////////////////////////////////////////

self.prototype.append = function(p) {

  // translate
  var ep = this.getEndPoint();
  var bp = p.getBeginPoint();
  var x = ep.x - bp.x;
  var y = ep.y - bp.y;
  p.translate(x, y);

  // append edges
  for(var i = 0; i < p.edges.length; i++) {
    this.addEdge(p.edges[i]);
  }

}

/// duplicate path /////////////////////////////////////////////////////////////

self.prototype.duplicate = function() {

  var newPath = new an.Path();

  this.edges.forEach(function(edg) {
    newPath.addEdge( edg.duplicate() );
  });

  this.copyAttributes(newPath);

  return newPath;

}

self.prototype.copyAttributes = function(to) {

  to.complete = this.complete;
  to.closePath = this.closePath;
  to.lineWidth = this.lineWidth;
  to.lineCap = this.lineCap;
  to.lineJoin = this.lineJoin;
  to.miterLimit = this.miterLimit;
  to.fill = this.fill;
  to.fillColor = this.fillColor.duplicate();
  to.fillStyle = this.fillStyle;
  to.stroke = this.stroke;
  to.strokeColor = this.strokeColor.duplicate();
  to.strokeStyle = this.strokeStyle;
  to.shadowColor = this.shadowColor;
  to.shadowOffsetX = this.shadowOffsetX;
  to.shadowOffsetY = this.shadowOffsetY;
  to.shadowBlur = this.shadowBlur;

}

}  // block

