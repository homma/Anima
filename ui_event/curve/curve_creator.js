/*
 * @author Daisuke Homma
 */

new function() {  // block

an.CurveCreator = function() {

  this.curve;
  this.nextCurve;

  this.state = {};
  this.state.initial = new an.CurveCreatorInitialState(this);
  this.state.dragging = new an.CurveCreatorDraggingState(this);
  this.state.hover = new an.CurveCreatorHoverState(this);
  this.state.firstMove = new an.CurveCreatorFirstMoveState(this);
  this.state.finishing = new an.CurveCreatorFinishingState(this);

  an.g.CurveCreator = this;

};
var self = an.CurveCreator;

// inherit from an.EventState
self.prototype = new an.EventState();

self.prototype.select = function() {

  an.g.editor.setEditorMode(an.g.editor.EditorModes.curve);
  this.selectNextState(this.state.initial);

};

self.prototype.deselect = function() {

  this.deselectSelf();

  this.curve = null;

};

self.prototype.setCurve = function(val) {
  this.curve = val;
};

self.prototype.getCurve = function() {
  return this.curve;
};

self.prototype.setNextCurve = function(val) {
  this.nextCurve = val;
};

self.prototype.getNextCurve = function() {
  return this.nextCurve;
};

} // block
