var RaphaelWrapper = function(containerId) {
  var raphaelObject,
      raphaelset;

  this.prepare = function() {
    if (!raphaelObject) {
      raphaelObject = Raphael(containerId);
      raphaelObject.setSize(screen.width, screen.height);
      raphaelSet = raphaelObject.set();
    }
  };

  this.drawCircle = function(point, radius, colorString, animationTime) {
    var initialRadius = 0;
    var circle = raphaelObject.circle(point.x, point.y, initialRadius)
                        .attr({
                          fill: colorString,
                          stroke: colorString
                        });

    circle.animate({ r: radius }, (animationTime || 0), "backOut");
    raphaelSet.push(circle);
    return circle;
  };

  this.clear = function(animationTime, callback) {
    animationTime = animationTime || 0;

    raphaelSet.animate(
      { r: 0 },
      animationTime,
      "linear",
      function() {
        raphaelSet.remove();
        callback && callback();
      }
    );
  };
};
