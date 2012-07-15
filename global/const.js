/*
 * @author Daisuke Homma
 */

new function() { // block

// an.Curve
an.k.P0 = 1;
an.k.C0 = 2;
an.k.C1 = 3;
an.k.P1 = 4;

// directon; used in resize handle
//
// [NW]  [N]  [NE]
// [W]    +    [E]
// [SW]  [S]  [SE]
//
an.k.N = 1;
an.k.NE = 2;
an.k.E = 3;
an.k.SE = 4;
an.k.S = 5;
an.k.SW = 6;
an.k.W = 7;
an.k.NW = 8;

// directon; used in rotation handle
//
//       [T]
// [L] - [C] - [R]
//       [B]
//
an.k.C = 0;    // center
an.k.L = 1;    // left
an.k.R = 2;    // right
an.k.T = 3;    // top
an.k.B = 4;    // bottom

} // block

