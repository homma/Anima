/*
 * @fileOverview default settings
 * @author Daisuke Homma
 */

new function() { // block

// Line Attributes
an.d.lineWidth = 0.2;
an.d.lineCap = "butt";    // butt / round / square
an.d.lineJoin = "miter";  // bevel / round / miter
an.d.miterLimit = 10.0;   // > 0

// Color
an.d.fillH = 0;
an.d.fillS = 100;
an.d.fillL = 0;
an.d.fillA = 1;
an.d.strokeH = 0;
an.d.strokeS = 100;
an.d.strokeL = 0;
an.d.strokeA = 1;

// Curve
an.d.p0 = {};
an.d.p0.radius = 4;
an.d.p0.lineWidth = 0.8;
an.d.p0.stroke = 'rgb(255,102,255)';
an.d.p0.fill = 'rgb(255,102,255)';
an.d.p1 = {};
an.d.p1.radius = 4;
an.d.p1.lineWidth = 0.8;
an.d.p1.stroke = 'rgb(255,102,255)';
an.d.p1.fill = 'rgb(255,255,255)';
an.d.c0 = {};
an.d.c0.radius = 4;
an.d.c0.lineWidth = 0.8;
an.d.c0.stroke = 'rgb(255,102,255)';
an.d.c0.fill = 'rgb(255,255,255)';
an.d.c1 = {};
an.d.c1.radius = 4;
an.d.c1.lineWidth = 0.8;
an.d.c1.stroke = 'rgb(255,102,255)';
an.d.c1.fill = 'rgb(255,255,255)';

// Resize Handle
an.d.ResizeGuideLineStyle = "black";
an.d.ResizeGuideFillStyle = "lightgray";
an.d.ResizeGuideLineWidth = 0.1;
an.d.ResizeGuideCircleR   = 4;

// Rotation Handle
an.d.RotateGuideLineStyle  = "black";
an.d.RotateGuideFillStyle  = "lightgray";
an.d.RotateGuideLineWidth  = 0.1;
an.d.RotateGuideLineLength = 80;
an.d.RotateGuideCircleR    = 4;
an.d.RotateGuideAngle      = 0;

} // block

