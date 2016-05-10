var Visual = function(containerId) {
  var container = new RaphaelWrapper(containerId);
  var drawConfig = new CircleDrawConfig();
  var currentlyRendering = false;

  this.render = function(drawable) {
    currentlyRendering = true;
    container.prepare();
    renderVisual(drawable, function() {
      currentlyRendering = false;
    });
    return this;
  };

  this.currentlyRendering = function() {
    return currentlyRendering;
  };

  this.clear = function(callback) {
    var animationTime = drawConfig.circleRemoveTime();
    container.clear(animationTime, callback);
    return this;
  };

  var renderVisual = function(drawable, callback) {
    var point = new Point({ x: 0, y: 0 }),
        circleIdx = 0;

    while (!screenHasFilled(point)) {
      var datum = drawable.getDrawDatum(circleIdx++);
      var radius = drawConfig.getRadius(datum.value);
      var colorString = datum.color;

      container.drawCircle(
        point,
        radius,
        colorString,
        drawConfig.circleDrawTime(),
        (lastCirclePoint(point, radius) ? callback : null)
      );

      updatePoint(point, radius);
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

  var lastCirclePoint = function(point, radius) {
    var copyOfPoint = new Point({ x: point.x, y: point.y });
    updatePoint(copyOfPoint, radius);
    return screenHasFilled(copyOfPoint);
  };

  var rowHasFilled = function(point) {
    return point.x > screen.width;
  };
};
