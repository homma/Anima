/*
 * @author Daisuke Homma
 */

new function() { // block

// Tool View

an.ToolView = function() {

  this.initToolView();

  an.g.toolView = this;

}

var self= an.ToolView;

self.prototype.createViews = function() {

  // related views
  new an.ExporterView();
  new an.ImporterView();
  new an.RasterizerView();

}

self.prototype.selectView = function(v) {

  an.g.ExporterView.deselect();
  an.g.ImporterView.deselect();
  an.g.RasterizerView.deselect();

  v.select();

}

self.prototype.initToolView = function() {

  this.createViews();

  var acts = an.g.GlobalAction;

  var str = "Anima: a vector animation editor (prototype)."

  an.u.onClick( "AnimaButton", function(){ alert(str); } );

  an.u.onClick( "penButton",
                function() { an.g.PathOp.selectPenHandler(); } );
  an.u.onClick( "curveCreatorButton",
                function() { an.g.PathOp.selectCurveCreator(); } );
  an.u.onClick( "rectCreatorButton",
                function() { an.g.PathOp.selectShapeCreator(an.k.Rectangle); });
  an.u.onClick( "ovalCreatorButton",
                function() { an.g.PathOp.selectShapeCreator(an.k.Oval); });
  an.u.onClick( "circleCreatorButton",
                function() { an.g.PathOp.selectShapeCreator(an.k.Circle); });
  an.u.onClick( "selectorButton",
                function() { an.g.PathOp.selectTransform(); } );

  an.u.onClick( "selectAllButton",
                function() {
                  an.g.PathOp.selectTransform();
                  acts.selectAll(); } );

  an.u.onClick( "clearButton", acts.clear );
  an.u.onClick( "deleteButton", acts.deleteSelected );
  an.u.onClick( "cutButton", acts.cut );
  an.u.onClick( "copyButton", acts.copy );
  an.u.onClick( "pasteButton", acts.paste );
  an.u.onClick( "undoButton", acts.undo );
  an.u.onClick( "redoButton", acts.redo );
  an.u.onClick( "saveButton", acts.save );
  an.u.onClick( "restoreButton", acts.restore );

  // Views
  var tv = this;
  an.u.onClick( "exportButton",
                function() { tv.selectView(an.g.ExporterView); } );
  an.u.onClick( "importButton",
                function() { tv.selectView(an.g.ImporterView); } );
  an.u.onClick( "rasterizeButton",
                function() { tv.selectView(an.g.RasterizerView); } );

  // an.u.onClick( "runButton", 
  // an.u.onClick( "configButton", 

}

} // block

