// square tiles
//  color (required)
(function() {

var symbolId = 0;
var symbolName = "square";

shapes[symbolName] = shapes[symbolId] = {
    name: symbolName,
    align: basicAlign,
    symbol: function(parent) {
      parent.rect(1, 1).radius(gridPadding/4).size(tileWidth / 2).id('square').addClass('squareSymbol')
    },
    validate: function(data, area, tile) {
      return area.every(function(t) {
        return matchProp(t.symbol, data, "color");
      });
    },
    compress: function(d) {
      return symbolId + '-' + d.x + '-' + d.y + '-' + d.color;
    },
    decompress: function(d) {
      return {
        type: symbolName,
        x: parseInt(d[1]),
        y: parseInt(d[2]),
        color: d[3]
      };
    },
}

})();
