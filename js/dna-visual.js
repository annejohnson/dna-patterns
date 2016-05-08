var DNAVisual = function(containerId, dnaSequence) {
  var container = new RaphaelWrapper(containerId);
  var drawConfig = new CircleDrawConfig();

  this.render = function() {
    container.prepare();
    createVisual();
    return this;
  };

  this.clear = function() {
    container.clear(drawConfig.circleRemoveTime());
    return this;
  };

  var createVisual = function() {
    var point = new Point({ x: 0, y: 0 }),
        circleIdx = 0;

    while (!screenHasFilled(point)) {
      var datum = dnaSequence.getDrawDatum(circleIdx);
      var radius = drawConfig.getRadius(datum.value);
      var colorString = datum.color;

      container.drawCircle(
        point,
        radius,
        colorString,
        drawConfig.circleDrawTime()
      );

      updatePoint(point, radius);

      circleIdx++;
    }
  };

  var screenHasFilled = function(point) {
    return point.y > (screen.height + drawConfig.maxDiameter());
  };

  var updatePoint = function(point, radius) {
    var distanceToNextCircleCenter = drawConfig.marginBetweenCircles();

    if (rowHasFilled(point)) {
      distanceToNextCircleCenter += drawConfig.maxDiameter();
      point.x = 0;
      point.y = point.y + distanceToNextCircleCenter;
    } else {
      distanceToNextCircleCenter += radius + drawConfig.maxRadius();
      point.x = point.x + distanceToNextCircleCenter;
    }
  };

  var rowHasFilled = function(point) {
    return point.x > screen.width;
  };
};
