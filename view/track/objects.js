/*
 * @author Daisuke Homma
 */

// Track View Helper Objects

new function() { //block

var TrackField = function(parent, n, domElem) {

  this.trackView = parent;
  this.nth = n;
  this.elem = domElem;
  this.label = new Label( this,  this.findNode(domElem, "label") );
  this.timeFrameContainer = new TimeFrameContainer( this,
                          this.findNode(domElem, "time_frame_container") );

}

TrackField.prototype.findNode = an.u.findChildNodeByClass;

an.TrackField = TrackField;

var Label = function(parent, domElem) {

  this.field = parent;
  this.elem = domElem;
  this.active = this.findNode(domElem, "active");
  this.visibility = this.findNode(domElem, "visibility");
  this.trackName = this.findNode(domElem, "track_name");

  var thisLabel = this;
  this.active.onclick = function(e) { thisLabel.activePaneOnClick(e.target); };
}

Label.prototype.findNode = an.u.findChildNodeByClass;

Label.prototype.activePaneOnClick = function(elem) {

  console.log("active clicked at: " + this.field.nth);
}

var TimeFrameContainer = function(parent, domElem) {

  this.field = parent;
  this.elem = domElem;
  this.timeFrameElems = [];

}

TimeFrameContainer.prototype.onClick = function(elem) {

  elem.style.background = "dimgray";

  var nthField = this.field.nth;
  var nthFrame = this.findEntry(elem);

  this.field.trackView.selectTimeFrame(nthField, nthFrame);

}

TimeFrameContainer.prototype.findEntry = function(elem) {

  for(var i = 0; i < this.timeFrameElems.length; i++) {
    if( this.timeFrameElems[i] == elem) { return i };
  }

}

} // block

