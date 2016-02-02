var tileWidth = 150;
var gridPadding = 40;
var shapeSpacing = tileWidth/5;

// shape files will insert data into this
var shapes = {};

// vertex to pixel
var vtp = function(x) {
  return gridPadding + x * tileWidth;
}

// tile to point
var ttp = function(x) {
    return x * tileWidth + gridPadding + tileWidth / 2;
}

// point to tile
var ptt = function(x) {
    return (x - gridPadding - tileWidth / 2) / tileWidth;
}

// point to lineGroup
var ptl = function(x, y) {
  return [Math.round((x - gridPadding) / tileWidth) * tileWidth, Math.round((y - gridPadding) / tileWidth) * tileWidth];
}


var basicAlign = function(parent, data) {
  var shape = parent.use(data.type).move(ttp(data.x) - tileWidth/4, ttp(data.y) - tileWidth/4);
  if(data.color) {
    shape.fill(data.color);
  }
}

var matchProp = function(obj1, obj2, prop) {
  return obj1 && obj2 && obj1[prop] && obj2[prop] && (obj1[prop] === obj2[prop]);
}
