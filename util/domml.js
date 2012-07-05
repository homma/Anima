
// @author: Daisuke Homma

new function() { // block

an.DOMML = this;

// capturing 'this' to 'self' for convenience.
var self = this;

var defined = function(obj, param) {

  if(typeof obj[param] === 'undefined') {
    return false;
  }

  return true;

}

var match = function(val, arr) {

  return arr.some(function(v) {
    return (v == val);
  });

}

var special = [ 'tag', 'class', 'content', 'style', 'contains' ];

self.create = function(obj) {

  var elem = self.tag(obj);

  for(i in obj) {

    if( match(obj, special) ) { continue };

    elem[i] = obj[i];

  }

  self.class(obj, elem);
  self.content(obj, elem);
  self.style(obj, elem);
  self.contains(obj, elem);

  return elem;

}

self.tag = function(obj) {

  if( !defined(obj, 'tag') ) {
    obj.tag = 'div';  // div is the default tag
  }

  return document.createElement(obj.tag);

}

self.class = function(obj, elem) {

  if( !defined(obj, 'class') ) { return };

  elem.className = obj.class;

}

self.content = function(obj, elem) {

  if( !defined(obj, 'content') ) { return };

  elem.innerText = obj.content;

}

self.style = function(obj, elem) {

  if( !defined(obj, 'style') ) { return };

  for(i in obj.style) {

    elem.style[i] = obj.style[i];

  }

}

self.contains = function(obj, elem) {

  if( !defined(obj, 'contains') ) { return };

  var fragment = document.createDocumentFragment();

  obj.contains.forEach( function(v, i) {

    var el = self.create(obj.contains[i]);
    fragment.appendChild(el);

  });

  elem.appendChild(fragment);

}

} // block

