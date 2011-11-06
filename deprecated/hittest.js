/*
 * @author Daisuke Homma
 */

// check if ceil / floor is necessary
// add margin if necessary

var HitTest = {};

HitTest.debug = false;

HitTest.debugPrint = function(s) {
  if(HitTest.debug) console.log(s);
}

HitTest.Point = function(x, y) {
  this.x = x;
  this.y = y;
}

HitTest.Quad = function(a, b, c, d) {
  return new Array(a, b, c, d);
}

HitTest.Triangle = function(a, b, c) {
  return new Array(a, b, c);
}

HitTest.diagonalOfPointZero = function(quad) {
  // calculates diagonal point of quad[0].

  var a = quad[0];
  var b = quad[1];
  var c = quad[2];
  var d = quad[3];

  var ab = (a.y == b.y) ? 0 : (a.x - b.x) / (a.y - b.y);
  var ac = (a.y == c.y) ? 0 : (a.x - c.x) / (a.y - c.y);
  var ad = (a.y == d.y) ? 0 : (a.x - d.x) / (a.y - d.y);

  if(ab >= ac) {
    if(ad >= ab) return 1;  // ad >= ab >= ac
    if(ac >= ad) return 2;  // ab >= ac >= ad
    return 3;               // ab >= ad >= ac
  } else {  // ac > ab
    if(ad >= ac) return 2;  // ad >= ac >  ab
    if(ab >= ad) return 1;  // ac >  ab >= ad
    return 3;               // ac >= ad >= ab
  }

}

HitTest.isInBound = function(points, x, y) {
  // determines if the point (x, y) is inside the rectangle.

  xIsMax = xIsMin = yIsMax = yIsMin = true;

  // HitTest.debugPrint("x: " + x + ", y: " + y);

  for(var i in points) {
    // HitTest.debugPrint("points[" + i + "].x: " + points[i].x);
    // HitTest.debugPrint("points[" + i + "].y: " + points[i].y);
    if(x <= points[i].x) xIsMax = false;
    if(x >= points[i].x) xIsMin = false;
    if(y <= points[i].y) yIsMax = false;
    if(y >= points[i].y) yIsMin = false;
  }

  if(xIsMax || xIsMin || yIsMax || yIsMin) {
    // HitTest.debugPrint("isInBound: false");
    // HitTest.debugPrint("xIsMax: " + xIsMax);
    // HitTest.debugPrint("xIsMin: " + xIsMin);
    // HitTest.debugPrint("yIsMax: " + yIsMax);
    // HitTest.debugPrint("yIsMin: " + yIsMin);
    return false;
  }

  return true;
}

HitTest.yIsInRange = function(p0, p1, y) {
  // determines if y is in between p0.y and p1.y

  if( (p0.y > y) && (p1.y > y) ) {
    // HitTest.debugPrint("yIsInRange: false");
    return false;
  }
  if( (p0.y < y) && (p1.y < y) ) {
    // HitTest.debugPrint("yIsInRange: false");
    return false;
  }
  return true;

}

HitTest.xAtYOfLine = function(p0, p1, y) {
  // calculates x at y in line p0-p1.

  // if( (p0.y == p1.y) && (p0.y != y) ) raise exception...

  if( (p0.y == p1.y) && (p0.y == y) ) return p0.x;  // enough?

/*
 * y = ax + b
 * b = y - ax
 * x = (y - b) / a
 */

  var a = (p0.x - p1.x) / (p0.y - p1.y);
  var b = p0.y - p0.x * a;
  var x = (y - b) / a;

  return x;  // Math.ceil or floor?
}

HitTest.isInsideOfTriangle = function(tri, x, y) {

  // Min/Max test
  if( !HitTest.isInBound(tri, x, y) ) {
    // HitTest.debugPrint("isInsideOfTriangle: false");
    return false;
  }

  var a = tri[0];
  var b = tri[1];
  var c = tri[2];

  if( HitTest.yIsInRange(a, b, y) ) { // abx

    if( HitTest.yIsInRange(b, c, y) ) { // bcx
      var abx = HitTest.xAtYOfLine(a, b, y);
      var bcx = HitTest.xAtYOfLine(b, c, y);

      if( (Math.max(abx, bcx) >= x) && (x >= Math.min(abx, bcx)) )
        return true;

      // HitTest.debugPrint("isInsideOfTriangle: false");
      return false;
    }

    if( HitTest.yIsInRange(c, a, y) ) { // cax
      var abx = HitTest.xAtYOfLine(a, b, y);
      var cax = HitTest.xAtYOfLine(c, a, y);

      if( (Math.max(abx, cax) >= x) && (x >= Math.min(abx, cax)) )
        return true;

      // HitTest.debugPrint("isInsideOfTriangle: false");
      return false;
    }

  } else {
    var bcx = HitTest.xAtYOfLine(b, c, y);
    var cax = HitTest.xAtYOfLine(c, a, y);

    if( (Math.max(bcx, cax) >= x) && (x >= Math.min(bcx, cax)) )
      return true;

    // HitTest.debugPrint("isInsideOfTriangle: false");
    return false;
  }

}

HitTest.isInsideOfQuad = function(quad, x, y) {
  // public interface

  // Min/Max test
  if(! HitTest.isInBound(quad, x, y) ) {
    // HitTest.debugPrint("isInsideOfQuad: false");
    return false;
  }

  // Triangle test
  var diagonal = HitTest.diagonalOfPointZero(quad);  // 1 or 2 or 3

  switch(diagonal) {
    case 1:
      var tri = new HitTest.Triangle(quad[0], quad[1], quad[2]);
      if(HitTest.isInsideOfTriangle(tri, x, y )) return true;

      tri = new HitTest.Triangle(quad[0], quad[1], quad[3]);
      if(HitTest.isInsideOfTriangle(tri, x, y )) return true;

      break;

    case 2:
      var tri = new HitTest.Triangle(quad[0], quad[2], quad[1]);
      if(HitTest.isInsideOfTriangle(tri, x, y )) return true;

      tri = new HitTest.Triangle(quad[0], quad[2], quad[3]);
      if(HitTest.isInsideOfTriangle(tri, x, y )) return true;

      break;

    case 3:
      var tri = new HitTest.Triangle(quad[0], quad[3], quad[1]);
      if(HitTest.isInsideOfTriangle(tri, x, y )) return true;

      tri = new HitTest.Triangle(quad[0], quad[3], quad[2]);
      if(HitTest.isInsideOfTriangle(tri, x, y )) return true;

      break;
  }

  return false;

}

HitTest.usage = function() {

  var a = new HitTest.Point(150,100);
  var b = new HitTest.Point(200,150);
  var c = new HitTest.Point(150,200);
  var d = new HitTest.Point(100,150);

  var quad = new HitTest.Quad(a, b, c, d);

  // 1st test
  var x = 150;
  var y = 150;

  if( HitTest.isInsideOfQuad(quad, x, y) ) {
    console.log("hit!");
  } else {
    console.log("miss.");
  }

  // 2nd test
  x = 176;
  y = 175;

  if( HitTest.isInsideOfQuad(quad, x, y) ) {
    console.log("hit!");
  } else {
    console.log("miss.");
  }

}

HitTest.benchmark = function() {
  // test function

  // HitTest.debugPrint("test start...");

  var a = new HitTest.Point(100,100);
  var b = new HitTest.Point(200,100);
  var c = new HitTest.Point(200,200);
  var d = new HitTest.Point(100,200);

  var quad = new HitTest.Quad(a, b, c, d);

  var pre = (new Date).getMilliseconds();
  for(var i = 0; i < 300; i++) {
    for(var j = 0; j < 300; j++) {
      HitTest.isInsideOfQuad(quad, i, j);
      // console.log(i + "@" + j + ": " + HitTest.isInsideOfQuad(quad, i, j));
    }
  }
  var post = (new Date).getMilliseconds();

  console.log("90000: " + (post - pre));

  pre = (new Date).getMilliseconds();
  for(var i = 0; i < 300; i = i + 10) {
    for(var j = 0; j < 300; j = j + 10) {
      HitTest.isInsideOfQuad(quad, i, j);
      // console.log(i + "@" + j + ": " + HitTest.isInsideOfQuad(quad, i, j));
    }
  }
  post = (new Date).getMilliseconds();

  console.log("900: " + (post - pre));

  pre = (new Date).getMilliseconds();
  for(var i = 1000; i < 1300; i = i + 10) {
    for(var j = 1000; j < 1300; j = j + 10) {
      HitTest.isInsideOfQuad(quad, i, j);
      // console.log(i + "@" + j + ": " + HitTest.isInsideOfQuad(quad, i, j));
    }
  }
  post = (new Date).getMilliseconds();

  console.log("0 @ 900: " + (post - pre));

  pre = (new Date).getMilliseconds();
  for(var i = 0; i < 300; i = i + 10) {
    for(var j = 0; j < 300; j = j + 10) {
      HitTest.isInsideOfQuad(quad, 0, 0);
      // console.log(i + "@" + j + ": " + HitTest.isInsideOfQuad(quad, i, j));
    }
  }
  post = (new Date).getMilliseconds();

  console.log("0 @ 900: " + (post - pre));

}

// HitTest.usage();

