
// @author: Daisuke Homma

new function() { // block

an.Loader = this;

// capturing 'this' to 'self' for convenience.
var self = this;

self.loadInOrder = function(path) {

  self.loadInternal(path, false, false);

}

self.loadAsync = function(path) {

  self.loadInternal(path, true, false);

}

self.loadDefer = function(path) {

  self.loadInternal(path, false, true);

}

self.load = self.loadAsync;

self.loadInternal = function(path, async, defer) {

  var el = document.createElement('script');

  el.type = "text/javascript";
  el.async = async;
  el.defer = defer;
  el.src = path;

  document.getElementsByTagName("head")[0].appendChild(el);

}

} // block

