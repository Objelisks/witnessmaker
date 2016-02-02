// error tiles
(function() {

var symbolId = 4;
var symbolName = "error";

shapes[symbolName] = shapes[symbolId] = {
    name: symbolName,
    align: basicAlign,
    symbol: function(parent) {
      parent.path('M 0 0 L -.5 .3 M 0 0 L 0 -.5 M 0 0 L .5 .3').move(tileWidth / 8, tileWidth / 8).size(tileWidth / 4).id('error').addClass('errorSymbol');
    },
    validate: function(data, area, tile) {
      return true;
    },
    compress: function(d) {
      return symbolId + '-' + d.x + '-' + d.y;
    },
    decompress: function(d) {
      return {
        type: symbolName,
        x: parseInt(d[1]),
        y: parseInt(d[2])
      };
    },
}

})();
