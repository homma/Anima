/*
 * @author Daisuke Homma
 */

new function() {  // block

var self = Anima.Editor;

/// delete / cut / copy / paste selected paths /////////////////////////////////

self.prototype.deleteAll = function() {
  this.pathList.splice(0, this.pathList.length);
}

self.prototype.deleteSelected = function() {

  for (var i = this.pathList.length - 1; i >= 0; i--) {

    var path = this.pathList[i];

    if( path.getSelected() ) {  // true if the path is selected.
      this.deselectPath(path);
      this.pathList.splice(i, 1);
    }

  }

}

self.prototype.cut = function() {

  this.clipBoard = [];

  for (var i = 0; i < this.pathList.length; i++) {
    if(this.pathList[i].getSelected()) {

      this.clipBoard.push(this.pathList[i].duplicate());

    }
  }

  this.deleteSelected();

}

self.prototype.copySelected = function() {
  var selected = [];

  for (var i = 0; i < this.pathList.length; i++) {
    if(this.pathList[i].getSelected()) {  // true if the path is selected.
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

self.prototype.paste = function() {
  if( this.clipBoard.length == 0 ) return;

  this.deselectAll();

  for (var i = 0; i < this.clipBoard.length; i++) {

      var path = this.clipBoard[i].duplicate();
      this.selectPath(path);
      this.pathList.push(path);

  }
}

} // block
