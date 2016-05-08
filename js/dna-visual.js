var DnaVisual = function(containerId, dnaString) {
  var container = new DnaVisualContainer(containerId);
  var drawOptions = new CircleDrawConfig();
  var dnaData = new DnaData(dnaString);

  this.render = function() {
    container.prepare();
    createVisual();
    return this;
  };

  this.clear = function() {
    container.clear(drawOptions.circleRemoveTime());
    return this;
  };

  var createVisual = function() {
    var point = new Point({ x: 0, y: 0 }),
        circleIdx = 0;

    while (!screenHasFilled(point)) {
      var datum = dnaData.getDrawDatum(circleIdx);
      var radius = getRadius(datum.value);
      var colorString = datum.color;

      container.drawCircle(
        point,
        radius,
        colorString,
        drawOptions.circleDrawTime()
      );

      updatePoint(point, radius);

      circleIdx++;
    }
  };

  var screenHasFilled = function(point) {
    return point.y > (screen.height + drawOptions.maxDiameter());
  };

  var getRadius = function(dataInt) {
    return (dataInt + drawOptions.radiusAdder()) *
             drawOptions.radiusMultiplier();
  };

  var updatePoint = function(point, radius) {
    var margin = drawOptions.marginBetweenCircles();

    if (rowHasFilled(point)) {
      point.x = 0;
      point.y = point.y + drawOptions.maxRadius() + margin;
    } else {
      point.x = point.x + radius + margin;
    }
  };

  var rowHasFilled = function(point) {
    return point.x > screen.width;
  };
};
