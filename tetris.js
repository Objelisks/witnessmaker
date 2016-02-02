// tetris tiles
//  color (required)
(function() {

var symbolId = 3;
var symbolName = "tetris";

// string to integer
var compressShape = function(shape) {
  return shape.map(function(pt) { return pt.join(':')}).join(';');
}
var decompressShape = function(data) {
  return data.split(';').map(function(pt) { return pt.split(':').map(Number); });
}

shapes[symbolName] = shapes[symbolId] = {
    name: symbolName,
    align: function(parent, data) {
      var tetrisGroup = parent.group();
      data.shape.forEach(function(point) {
        tetrisGroup.use(data.type).move(point[0] * shapeSpacing, point[1] * shapeSpacing);
      });
      tetrisGroup.center(ttp(data.x), ttp(data.y));
      if(!data.fixed) {
        tetrisGroup.rotate(15);
      }
    },
    symbol: function(parent) {
      parent.rect(1, 1).size(tileWidth / 6).id('tetris').addClass('tetrisSymbol');
    },
    validate: function(data, area, tile) {
      return true;
    },
    compress: function(d) {
      return symbolId + '-' + d.x + '-' + d.y + '-' + (d.fixed ? 1 : 0) + '-' + compressShape(d.shape);
    },
    decompress: function(d) {
      return {
        type: symbolName,
        x: parseInt(d[1]),
        y: parseInt(d[2]),
        fixed: d[3] == '1',
        shape: decompressShape(d[4])
      };
    },
}

})();
