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

  // assign an onclick function to an html element.
  var registerOnClick = function(id, fun) {
    var elem = document.getElementById(id);
    elem.onclick = fun;
  }

  // assign an onchange function to an html element.
  var registerOnChange = function(id, fun) {
    var elem = document.getElementById(id);
    elem.onchange = fun;
  }

  var ops = an.g.operations;
  var str = "Anima: a vector animation editor (prototype)."
  registerOnClick( "AnimaButton", function(){ alert(str); } );
  registerOnClick( "penButton", function() { select(penHandler); } );
  registerOnClick( "curveCreatorButton", function() { select(curveCreator);} );
  // registerOnClick( "shapeButton", 
  registerOnClick( "selectorButton", function() { select(selector); } );
  registerOnClick( "selectAllButton", function() {
                                        select(selector);
                                        ops.selectAll();
                                      } );
  registerOnClick( "clearButton", ops.clear );
  registerOnClick( "deleteButton", ops.delete );
  registerOnClick( "cutButton", ops.cut );
  registerOnClick( "copyButton", ops.copy );
  registerOnClick( "pasteButton", ops.paste );
  registerOnClick( "undoButton", ops.undo );
  registerOnClick( "redoButton", ops.redo );
  registerOnClick( "saveButton", ops.save );
  registerOnClick( "restoreButton", ops.restore );
  registerOnClick( "exportButton", function() { select(exporterView); } );
  registerOnClick( "importButton", function() { select(importerView); } );
  registerOnClick( "rasterizeButton", function() { select(rasterizerView); } );
  // registerOnClick( "runButton", 
  // registerOnClick( "configButton", 

}

} // block

