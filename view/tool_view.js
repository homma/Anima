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

self.prototype.createObjects = function() {

  new an.Selector();
  new an.PenHandler();
  new an.CurveCreator();
  new an.ExporterView();
  new an.ImporterView();
  new an.RasterizerView();

}

self.prototype.initToolView = function() {

  this.createObjects();

  // instantiate handlers
  var selector = an.g.Selector;
  var penHandler = an.g.PenHandler;
  var curveCreator = an.g.CurveCreator;
  var exporterView = an.g.ExporterView;
  var importerView = an.g.ImporterView;
  var rasterizerView = an.g.RasterizerView;

  // set current tool
  var currentTool = selector;
  currentTool.select();

  var select = function(t) {
                 currentTool.deselect();
                 currentTool = t;
                 currentTool.select();
               };

  var acts = an.g.GlobalAction;

  var str = "Anima: a vector animation editor (prototype)."

  an.u.onClick( "AnimaButton", function(){ alert(str); } );
  an.u.onClick( "penButton", function() { select(penHandler); } );
  an.u.onClick( "curveCreatorButton",
                function() { select(curveCreator);} );
  // an.u.onClick( "shapeButton", 
  an.u.onClick( "selectorButton",
                function() { select(selector); } );
  an.u.onClick( "selectAllButton",
                function() { select(selector); acts.selectAll(); } );
  an.u.onClick( "clearButton", acts.clear );
  an.u.onClick( "deleteButton", acts.delete );
  an.u.onClick( "cutButton", acts.cut );
  an.u.onClick( "copyButton", acts.copy );
  an.u.onClick( "pasteButton", acts.paste );
  an.u.onClick( "undoButton", acts.undo );
  an.u.onClick( "redoButton", acts.redo );
  an.u.onClick( "saveButton", acts.save );
  an.u.onClick( "restoreButton", acts.restore );
  an.u.onClick( "exportButton", function() { select(exporterView); } );
  an.u.onClick( "importButton", function() { select(importerView); } );
  an.u.onClick( "rasterizeButton",
                function() { select(rasterizerView); } );
  // an.u.onClick( "runButton", 
  // an.u.onClick( "configButton", 

}

} // block

