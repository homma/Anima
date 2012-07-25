/*
 * @author Daisuke Homma
 */

/// modify this path ///////////////////////////////////////////////////////////

new function() {  // block

var self = an.Path;

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

/**
 * @description insert e1 after e0
 */
self.prototype.insertEdgeAfter = function(e0, e1) {

  var idx = this.edges.indexOf(e0);

  // when e0 is the last edge, just add e1
  if(idx == this.edges.length - 1) {
    this.addEdge(e1);
    return;
  }

  this.edges.splice(idx + 1, 0, e1);

  // fixes linkage
  this.edges[idx].next = e1;
  e1.next = this.edges[idx + 2];
  e1.prev = this.edges[idx];
  this.edges[idx + 2].prev = e1;

  e1.path = this;

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

/// subdivide //////////////////////////////////////////////////////////////////

self.prototype.subdivide = function() {

  // copy edge list
  var tmp = [];
  this.edges.forEach(function(e) { tmp.push(e) });

  tmp.forEach(function(e) { e.subdivide(); });

}

/// append a path //////////////////////////////////////////////////////////////

self.prototype.append = function(p) {

  // translate
  var ep = this.getEndPoint();
  var bp = p.getBeginPoint();
  var x = ep.x - bp.x;
  var y = ep.y - bp.y;
  p.translate(x, y);

  // curves do not connect smoothly
  this.edges[this.edges.length - 1].setSmoothConnect(false);

  // append edges
  for(var i = 0; i < p.edges.length; i++) {
    this.addEdge(p.edges[i]);
  }

}

/// duplicate path /////////////////////////////////////////////////////////////

self.prototype.duplicate = function() {

  var newPath = new an.Path();

  this.edges.forEach( function(edg) {
    newPath.addEdge( edg.duplicate() );
  });

  this.copyAttributes(this, newPath);

  return newPath;

}

self.prototype.copyAttributes = function(from, to) {

  to.complete = from.complete;
  to.closePath = from.closePath;
  to.lineWidth = from.lineWidth;
  to.lineCap = from.lineCap;
  to.lineJoin = from.lineJoin;
  to.miterLimit = from.miterLimit;
  to.fill = from.fill;
  to.fillColor = from.fillColor.duplicate();
  to.fillStyle = from.fillStyle;
  to.stroke = from.stroke;
  to.strokeColor = from.strokeColor.duplicate();
  to.strokeStyle = from.strokeStyle;
  to.shadowColor = from.shadowColor;
  to.shadowOffsetX = from.shadowOffsetX;
  to.shadowOffsetY = from.shadowOffsetY;
  to.shadowBlur = from.shadowBlur;

}

/// replace this path with another path ////////////////////////////////////////

self.prototype.replaceWith = function(newPath) {

  this.initPath();

  newPath.edges.forEach( function(v) {

    // duplicates may not be necessary
    this.addEdge(v.duplicate());

  },this);

  this.copyAttributes(newPath, this);

}

/// split this path ////////////////////////////////////////////////////////////

/**
 * @description split path
 * @param {Curve} curve a curve includes splitting point
 * @param {Number} point a position in the curve to split
 */
self.prototype.splitPath = function(curve, point) {

  var idx = this.edges.indexOf(curve);
  if(idx == -1) { return; }

  // when the point is anchor point 1, slide back the splitting point
  if(point == an.k.P1) { idx++; }

  // start point or end point of path => nothing to do here
  if(idx == 0) { return; }
  if(idx == this.edges.length) { return; }

  var newPath = new an.Path();
  this.copyAttributes(this, newPath);

  for(var i = idx; i < this.edges.length; i++) {
    newPath.addEdge( this.edges[i].duplicate() );
  }

  // add newly created path. it induces registering undo
  an.g.editor.addPath(newPath);

  // remove unnecessary edges
  this.removeEdgesAfter(idx);

  // returns newly created. it may be used for undo
  return newPath;

}

self.prototype.removeEdgesBefore = function(n) {

  // nothing to do
  if(n == 0) { return; }

  // whole path
  if(n == this.edges.length - 1) {
    an.g.editor.removePath(this);
    return;
  }

  // remove the edges
  this.edges.splice(0, n);

  // fix the linkage
  this.edges[0].prev = null;

}

self.prototype.removeEdgesAfter = function(n) {

  // whole path
  if(n == 0) {

    an.g.editor.removePath(this);

  } else {

    // remove the edges
    var idx = n;
    var howMany = this.edges.length - n;
    this.edges.splice(n, howMany);

    // fix the linkage
    this.edges[n - 1].next = null;

  }

}

}  // block

