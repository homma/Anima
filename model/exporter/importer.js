/*
 * @author Daisuke Homma
 */

new function() {  // block

an.Importer = function() {

  an.g.Importer = this;

};
var self = an.Importer;

self.prototype.import = function(obj) {

  // check
  if(obj.type != "ANIMA") return;  // do nothing

  // initialize
  an.g.editor.initialize();
  an.g.animation.initialize();

  // import
  an.g.animation.dataImport(obj.animation);

};

} // block

