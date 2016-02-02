// star tiles
//  color (required)
(function() {

var symbolId = 2;
var symbolName = "star";

shapes[symbolName] = shapes[symbolId] = {
    name: symbolName,
    align: basicAlign,
    symbol: function(parent) {
      var starSymbol = parent.group().id('star').addClass('starSymbol');
      var depth = '0.4';
      var pathstr = 'M -0.5 0.5 C -0.25 0.25 0.25 0.25 0.5 0.5 C 0.25 0.25 0.25 -0.25 0.5 -0.5 C 0.25 -0.25 -0.25 -0.25 -0.5 -0.5 C -0.25 -0.25 -0.25 0.25 -0.5 0.5 Z';
      var one = starSymbol.path(pathstr.replace(/0\.25/g, depth)).move(4, 4).size(tileWidth / 2.5);
      starSymbol.put(one.clone().rotate(45));
    },
    validate: function(data, area, tile) {
      return area.reduce(function(p, t) {
        return matchProp(t.symbol, data, "color") ? 1 : 0;
      }, 0) === 2;
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
