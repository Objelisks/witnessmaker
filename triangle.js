// triangle tiles
//  count (required, 1-3)
(function() {

var symbolId = 1;
var symbolName = "triangle";

shapes[symbolName] = shapes[symbolId] = {
    name: symbolName,
    align: function(parent, data) {
      var triangleGroup = parent.group();
      for(var i=0; i<data.count; i++) {
        triangleGroup.use(data.type).x((shapeSpacing+2)*i);
      }
      triangleGroup.center(ttp(data.x), ttp(data.y));
    },
    symbol: function(parent) {
      parent.polygon('-.5,.433 0,-.433 .5,.433').size(shapeSpacing).id('triangle').addClass('triangleSymbol');
    },
    validate: function(data, area, tile) {
      return tile.sides.reduce(function(pre, side) { return pre + side.covered; }, 0) === data.count;
    },
    compress: function(d) {
      return symbolId + '-' + d.x + '-' + d.y + '-' + d.count;
    },
    decompress: function(d) {
      return {
        type: symbolName,
        x: parseInt(d[1]),
        y: parseInt(d[2]),
        count: parseInt(d[3])
      };
    },
}
})();
