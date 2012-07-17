/*
 * @author Daisuke Homma
 */

an = {};   // Anima
an.g = {}; // global
an.k = {}; // const
an.d = {}; // default
an.u = {}; // util

function animaInit() {

  // document.open();
  new an.Canvas();
  new an.UndoManager();
  new an.Animation();
  new an.Editor();
  new an.Exporter();
  new an.Importer();
  new an.Operations();
  new an.PathInspectorView();
  new an.ToolView();
  new an.TrackView();
  new an.Tooltip();

}

window.onload = animaInit;
