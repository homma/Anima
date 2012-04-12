/*
 * @author Daisuke Homma
 */

new function() { // block

// Tool View

Anima.ToolView = function() {

  this.initToolView();

  Anima.Global.toolView = this;

}

Anima.ToolView.prototype.createObjects = function() {

  new Anima.Selector();
  new Anima.PenHandler();
  new Anima.LineHandler();
  new Anima.CurveCreator();
  new Anima.ExporterView();
  new Anima.ImporterView();
  new Anima.RasterizerView();

}

Anima.ToolView.prototype.initToolView = function() {

  this.createObjects();

  // instantiate handlers
  var selector = Anima.Global.Selector;
  var penHandler = Anima.Global.PenHandler;
  var lineHandler = Anima.Global.LineHandler;
  var curveCreator = Anima.Global.CurveCreator;
  var exporterView = Anima.Global.ExporterView;
  var importerView = Anima.Global.ImporterView;
  var rasterizerView = Anima.Global.RasterizerView;

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

  var ops = Anima.Global.operations;
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

