/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// delete / cut / copy / paste selected paths /////////////////////////////////

self.prototype._deleteAll = function() {
  this.pathList.splice(0, this.pathList.length);
}

self.prototype._deleteSelected = function() {

  for (var i = this.pathList.length - 1; i >= 0; i--) {

    var path = this.pathList[i];

    if( path.isSelected() ) {  // true if the path is selected.
      this.deselectPath(path);
      this.pathList.splice(i, 1);
    }

  }

}

self.prototype._cut = function() {

  this.clipBoard = [];

  for (var i = 0; i < this.pathList.length; i++) {
    if(this.pathList[i].isSelected()) {

      this.clipBoard.push(this.pathList[i].duplicate());

    }
  }

  this.deleteSelected();

}

self.prototype._copy = function() {
  var selected = [];

  for (var i = 0; i < this.pathList.length; i++) {
    if(this.pathList[i].isSelected()) {  // true if the path is selected.
      selected.push(i);
    }
  }

  if(selected == null) return;

  this.clipBoard = [];

  for (var i = 0; i < selected.length; i++) {

    var path = this.pathList[selected[i]].duplicate();
    path.translate(20, 20);
    this.clipBoard.push(path);

  }
}

self.prototype._paste = function() {
  if( this.clipBoard.length == 0 ) return;

  this.deselectAll();

  for (var i = 0; i < this.clipBoard.length; i++) {

      var path = this.clipBoard[i].duplicate();
      this.selectPath(path);
      this.pathList.push(path);

  }
}

} // block
