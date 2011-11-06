/*
 * @author Daisuke Homma
 */

function animaInit() {

  // document.open();
  new Anima.Canvas();
  new Anima.UndoManager();
  new Anima.Animation();
  new Anima.Editor(Anima.Global.canvas);
  new Anima.Exporter();
  new Anima.Importer();
  new Anima.Operations();
  new Anima.PathInspectorView();
  new Anima.ToolView();
  new Anima.TrackView();

}

window.onload = animaInit;

