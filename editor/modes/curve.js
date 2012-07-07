/*
 * @author Daisuke Homma
 */

new function() {  // block

an.CurveCreatorMode = function(ed) {

  this.setEditor(ed);
  // editor = ed;

  this.name = "CurveCreatorMode";

}
var self = an.CurveCreatorMode;

self.prototype = new an.EditorMode();


} // block
