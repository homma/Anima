/*
 * @author Daisuke Homma
 */

new function() {  // block

Anima.CurveCreator = function() {

  this.curve;
  this.nextCurve;

  this.state = {};
  this.state.initial = new Anima.CurveCreatorInitialState(this);
  this.state.dragging = new Anima.CurveCreatorDraggingState(this);
  this.state.hover = new Anima.CurveCreatorHoverState(this);
  this.state.firstMove = new Anima.CurveCreatorFirstMoveState(this);
  this.state.finishing = new Anima.CurveCreatorFinishingState(this);

  Anima.Global.CurveCreator = this;

};
var self = Anima.CurveCreator;

// inherit from Anima.EventState
self.prototype = new Anima.EventState();

self.prototype.select = function() {

  this.selectNextState(this.state.initial);

};

self.prototype.deselect = function() {

  this.disableAllHandlers();

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
