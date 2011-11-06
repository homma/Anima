/*
 * @author Daisuke Homma
 */

new function() {  // block

Anima.Importer = function() {

  Anima.Global.Importer = this;

};
var self = Anima.Importer;

self.prototype.import = function(obj) {

  // check
  if(obj.type != "ANIMA") return;  // do nothing

  // initialize
  Anima.Global.editor.initialize();
  Anima.Global.animation.initialize();

  // import
  Anima.Global.animation.dataImport(obj.animation);

};

} // block

