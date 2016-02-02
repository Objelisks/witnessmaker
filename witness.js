

/* level data format:

{
  gridsize: 4,
  start: {x:0, y:0},
  end: {x:3, y:3, angle:90},
  symbols: [
    {type:"square", color:"#000", x:3, y:0},
    ...
  ],
}

symbol types:
  square (color)
  triangle (count)
  star (color)
  tetris (shape, fixed)
  error
  collectable (direction 8way)
  break (direction 4way)

upgrades:
  multiple starts, ends
  mirrored lines

file:///E:/Code/projects/witnessmaker/index.html#4,0,4,4,0,0-0-3-&eee,0-0-0-&e00,2-3-0-&eee,1-1-0-1,1-1-1-2,1-2-0-3,3-1-2-0-0:0;0:1;0:2;1:0,3-2-2-1-0:0;0:1;1:0;1:1,4-3-3
*/
var data = {
  gridsize: 4,
  start: {x: 0, y: 4},
  end: {x: 4, y: 0},
  symbols: [
    {type: "square", x: 0, y: 3, color:'#eee'},
    {type: "square", x: 0, y: 0, color:'#e00'},
    {type: "star", x: 3, y: 0, color:'#eee'},
    {type: "triangle", x: 1, y: 0, count: 1},
    {type: "triangle", x: 1, y: 1, count: 2},
    {type: "triangle", x: 2, y: 0, count: 3},
    {type: "tetris", x: 1, y: 2, fixed: false, shape: [[0,0],[0,1],[0,2],[1,0]]},
    {type: "tetris", x: 2, y: 2, fixed: true, shape: [[0,0],[0,1],[1,0],[1,1]]},
    {type: "error", x: 3, y: 3}
  ]
};

if(window.location.hash.length > 1) {
  data = decompressData(window.location.hash.slice(1));
}

buildLevel(decompressData(compressData(data)));

var solvingGroup;
var solvingLine;
var solvingArray;
function buildLevel(data) {
  window.location.hash = compressData(data);

  var gridWidth = tileWidth * data.gridsize + gridPadding * 2;
  var element = SVG('puzzle').size(gridWidth, gridWidth).spof();

  var symbolCache = element.symbol().addClass('puzzleSymbols');
  Object.keys(shapes).forEach(function(shape) {
    shapes[shape].symbol(symbolCache);
  });

  var puzzle = element.group();

  var lineGroup = puzzle.group().addClass('gridLine');
  for (var i = 0; i <= data.gridsize; i++) {
    for (var j = 0; j <= data.gridsize; j++) {
      lineGroup.line(vtp(j), vtp(0), vtp(j), vtp(data.gridsize));
    }
    lineGroup.line(vtp(0), vtp(i), vtp(data.gridsize), vtp(i));
  }
  lineGroup.line(vtp(data.end.x), vtp(data.end.y), vtp(data.end.x)+20, vtp(data.end.y)-20)
  lineGroup.circle(gridPadding).attr({cx: vtp(data.start.x) , cy: vtp(data.start.y)})
    .mousedown(beginSolving);

  element.mousemove(solvingMove);

  solvingGroup = puzzle.group().addClass('solvingLine');
  solvingLine = solvingGroup.polyline(solvingArray);
  var solvingCircle = solvingGroup.circle(gridPadding).attr({cx: vtp(data.start.x) , cy: vtp(data.start.y)});
  solvingArray = [];
  solvingArray.push([vtp(data.start.x), vtp(data.start.y)]);
  solvingArray.push([]);
  //solvingGroup.move(vtp(data.start.x)-20, vtp(data.start.y)-20);

  var symbols = puzzle.group();
  data.symbols.forEach(function(symbol) {
    shapes[symbol.type].align(symbols, symbol);
  });

  var puzzleGlow = puzzle.clone();
  puzzleGlow.filter(function(add) {
    add.gaussianBlur(1);
  });
  element.put(puzzleGlow).back();

  var symbolGlow = symbols.clone();
  symbolGlow.filter(function(add) {
    add.gaussianBlur(4);
  });
  element.put(symbolGlow).back();
}

var solvingActive = false;

function beginSolving() {
  if(!solvingActive) {
    solvingActive = true;
    solvingGroup.opacity(1.0);
  }
}

function solvingMove(e) {
  var pt = [e.clientX, e.clientY];
  var linePt = ptl(pt[0], pt[1]);
  solvingArray[solvingArray.length-1] = linePt;
  solvingLine.plot(solvingArray);
  console.log(solvingArray[1]);
}

function compressData(d) {
  var out = [
    d.gridsize,
    d.start.x, d.start.y,
    d.end.x, d.end.y
  ];
  out = out.concat(d.symbols.map(function(symbol) {
    return shapes[symbol.type].compress(symbol);
  }));
  return out.join(',');
}

function decompressData(d) {
  var data = d.split(',');
  var out = {};
  out.gridsize = parseInt(data[0]);
  out.start = {x: parseInt(data[1]), y: parseInt(data[2])};
  out.end = {x: parseInt(data[3]), y: parseInt(data[4])};
  out.symbols = data.slice(5).map(function(symbolData) {
    var split = symbolData.split('-');
    return shapes[split[0]].decompress(split);
  });
  return out;
}
