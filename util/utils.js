/*
 * @author Daisuke Homma
 */

// Utility functions

Anima.Util.findChildNodeByClass = function(elem, name) {
  var nodes = elem.childNodes;
  var node = null;

  for(var i = 0; i < nodes.length; i++) {
    if(nodes[i].className == name) {
      node = nodes[i];
      break;
    }
  }

  return node;
}

Anima.Util.offset = function(elem) {
  var obj, left, top;
  obj = elem;
  left = 0;
  top = 0;

  while(obj.offsetParent) {
    left += obj.offsetLeft;
    top += obj.offsetTop;
    obj = obj.offsetParent;
  }

  return { left: left, top: top };
}

/*
Anima.Util.leftOffset = function(elem) {
  var obj, left;
  obj = elem;
  left = 0;

  while(obj.offsetParent) {
    left += obj.offsetLeft;
    obj = obj.offsetParent;
  }

  return left;
}

Anima.Util.topOffset = function(elem) {
  var obj, top;
  obj = elem;
  top = 0;

  while(obj.offsetParent) {
    top += obj.offsetTop;
    obj = obj.offsetParent;
  }

  return top;
}
*/

Anima.Util.getMousePositionInCanvas = function(e) {

  var canvas = e.target;
  var position = this.offset(canvas);

  var scrollTop = document.body.scrollTop;
  var scrollLeft = document.body.scrollLeft;

  var x = e.clientX - position.left + scrollLeft;
  var y = e.clientY - position.top + scrollTop;

  return { x: x, y: y };

}

/*
Anima.Util.registerOnClickFunction = function(id, fun) {

  var elem = document.getElementById(id);
  elem.onclick = fun;

}
*/

Anima.Util.getCompoundBoundary = function(rect1, rect2) {

  var rect = {};

  rect.x = Math.min(rect1.x, rect2.x);
  rect.y = Math.min(rect1.y, rect2.y);
  rect.w = Math.max(rect1.x + rect1.w, rect2.x + rect2.w) - rect.x;
  rect.h = Math.max(rect1.y + rect1.h, rect2.y + rect2.h) - rect.y;

  return rect;

}

